import React from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Tiles from './components/Tiles';
import Searchbar from './components/Searchbar';
import SideDrawer from './components/SideDrawer';
import { theme } from './theme';
import ApiService from './services/ApiService';
import CookieService from './services/CookieService';
import LocalStorageService from './services/LocalStorageService';
import NotificationWrapper from './common/NotificationWrapper';

const drawerWidth = 240;

const App = (props) => {
    const apiService = new ApiService();
    const cookieService = new CookieService();
    const localStorageService = new LocalStorageService();

    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);

    const [tags, setTags] = React.useState([]);
    const [isFetchingTags, setIsFetchingTags] = React.useState(false);
    const [isFetchingTagsError, setIsFetchingTagsError] = React.useState(false);

    const [news, setNews] = React.useState([]);
    const [nextNewsUrl, setNextNewsUrl] = React.useState('');
    const [isFetchingNews, setIsFetchingNews] = React.useState(false);
    const [isFetchingNewsError, setIsFetchingNewsError] = React.useState(false);

    const [tagsFilter, setTagsFilter] = React.useState('');
    const [summaryFilter, setSummaryFilter] = React.useState('');
    const [sourceFilter, setSourceFilter] = React.useState('');

    const [selectedPresets, setSelectedPresets] = React.useState([]);

    const getReadNewsFromLocalStorage = () => {
        const localStorageReadNews = localStorageService.getReadNews();
        return localStorageReadNews ?
            new Set(localStorageReadNews.split(',')) :
            new Set();
    };
    const [readNews, setReadNews] = React.useState(getReadNewsFromLocalStorage());

    const [isLoggedIn, setIsLoggedIn] = React.useState(Boolean(cookieService.getToken()));

    const [newNews, setNewNews] = React.useState([]);

    if (props.webSocket) {
        props.webSocket.onmessage = (event) => {
            const news = JSON.parse(event.data)?.data;
            setNewNews(previousValue => ([...previousValue, news]));
            setAlertOpen(true);
        };
    }

    React.useEffect(() => {
        const fetchData = async () => {
            await apiService.getNews({ limit: 16 }).then((data) => {
                if (!data) return;
                setNews(data.results || []);
                setNextNewsUrl(data.next);
            });
            await apiService.getTags().then((data) => {
                if (!data) return;
                setTags(data.sort((a, b) => b.count - a.count) || []);
            });
            await apiService.getAuthenticatedUserProfile().then((data) => {
                if(!data) return;
                setSelectedPresets(data.presets);
                const readNews = new Set([...data.read_news.map(id => id.toString())]);
                localStorageService.setReadNews([...readNews].join(','));
                setReadNews(readNews);
            });
        };
        fetchData();
    }, []);

    React.useEffect(() => {
        const fetchUserProfile = async () => {
            await apiService.getAuthenticatedUserProfile().then((data) => {
                if (!data) return;
                setSelectedPresets(data.presets);
                const readNews = new Set([...data.read_news.map(id => id.toString())]);
                localStorageService.setReadNews([...readNews].join(','));
                setReadNews(readNews);
            });
        };
        fetchUserProfile();
        if (isLoggedIn === false) {
            setReadNews(getReadNewsFromLocalStorage());
        }
    }, [isLoggedIn]);

    React.useEffect(() => {
        const listener = () => handleScroll(news, nextNewsUrl, isFetchingNews);
        window.addEventListener('scroll', listener);

        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, [news, nextNewsUrl, isFetchingNews]);

    React.useEffect(() => {
        const fetchFilteredNews = async () => {
            await filterBySummary(summaryFilter, selectedPresets);
        };
        fetchFilteredNews();
    }, [selectedPresets]);

    const fetchNews = async (sourceFilter, newsFilter, tags=undefined) => {
        setIsFetchingNews(true);
        await apiService.getNews({
            limit: 16,
            tags,
            summary: newsFilter,
            source: sourceFilter
        }).then((data) => {
            if (!data) return;
            setNews(data.results || []);
            setNextNewsUrl(data.next);
        }).catch(error => {
            setIsFetchingNewsError(error);
        }).finally(() => {
            setIsFetchingNews(false);
        });
    };

    const handleTagOnClick = async (tagName) => {
        setTagsFilter(tagName);
        await fetchNews(sourceFilter, summaryFilter, tagName);
    };

    const handleTagFilterSubmit = async (event) => {
        if (event.keyCode !== 13) return;
        event.preventDefault();

        setTagsFilter(event.target.value);
        setIsFetchingTags(true);
        await apiService.getTags({ name: event.target.value }).then((data) => {
            if (!data) return;
            setTags(data.sort((a, b) => b.count - a.count) || []);
        }).catch(error => {
            setIsFetchingTagsError(error);
        }).finally(() => {
            setIsFetchingTags(false);
        });
    };

    const handleSummaryFilterSubmit = async (event) => {
        if (event.keyCode !== 13) return;
        event.preventDefault();
        const inputValue = event.target.value;
        await filterBySummary(inputValue);
    };
    
    const filterBySummary = async (inputValue, presets=undefined) => {
        const presetsToUse = presets || selectedPresets;
        const presetKeywords = presetsToUse.flatMap(preset => preset.keywords);
        const searchFilter = [...presetKeywords, inputValue].filter(Boolean).join(',');
        setSummaryFilter(searchFilter);
        await fetchNews(sourceFilter, searchFilter);
    };

    const handleSourceFilterChange = async (event) => {
        const newSource = event.target.value;
        setSourceFilter(newSource);
        await fetchNews(newSource, summaryFilter);
    };

    const getMoreNews = async (news, nextNewsUrl, isFetchingNews) => {
        if (nextNewsUrl && !isFetchingNews) {
            await apiService.getNextNews(nextNewsUrl).then((data) => {
                if (!data) return;
                setNews([...news, ...data.results]);
                setNextNewsUrl(data.next);
            }).catch(error => {
                setIsFetchingNewsError(error);
            }).finally(() => {
                setIsFetchingNews(false);
            });
        }
    };

    const handleDrawerToggle = () => {
        setMobileDrawerOpen(!mobileDrawerOpen);
    };
    
    const handleScroll = async (news, nextNewsUrl, isFetchingNews) => {
        const { scrollTop, offsetHeight } = document.documentElement;
        const { innerHeight } = window;
        const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;
        if (bottomOfWindow) {
            await getMoreNews(news, nextNewsUrl, isFetchingNews);
        }
    };

    const patchProfileReadNews = async (readNews) => {
        await apiService.patchAuthenticatedUserProfile(undefined, [...readNews]);
    };

    const handleReadMoreClick = (id) => {
        setReadNews(prevSet => new Set([...prevSet, id.toString()]));
        const localStorageReadNews = localStorageService.getReadNews();
        if (localStorageReadNews) {
            localStorageService.setReadNews(`${localStorageReadNews},${id.toString()}`);
        } else {
            localStorageService.setReadNews(id.toString());
        }
        patchProfileReadNews(new Set([...readNews, id.toString()]));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar 
                    drawerWidth={drawerWidth}
                    handleDrawerToggle={handleDrawerToggle}
                    setSelectedPresets={(presets) => setSelectedPresets(presets)}
                    patchProfileReadNews={patchProfileReadNews}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                />
                <SideDrawer 
                    drawerWidth={drawerWidth}
                    tags={tags}
                    isFetchingTags={isFetchingTags}
                    isFetchingTagsError={isFetchingTagsError}
                    tagsFilter={tagsFilter}
                    handleTagOnClick={handleTagOnClick}
                    handleDrawerToggle={() => handleDrawerToggle}
                    mobileDrawerOpen={mobileDrawerOpen}
                />
                <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                    <Searchbar 
                        drawerWidth={drawerWidth} 
                        handleTagSubmit={(event) => handleTagFilterSubmit(event)}
                        handleNewsSubmit={(event) => handleSummaryFilterSubmit(event)}
                        sourceFilter={sourceFilter}
                        handleSourceChange={(event) => handleSourceFilterChange(event)}
                        selectedPresets={selectedPresets}
                    />
                    <Tiles 
                        news={news}
                        newNews={newNews}
                        nextNewsUrl={nextNewsUrl}
                        isFetchingNews={isFetchingNews}
                        isFetchingNewsError={isFetchingNewsError}
                        patchProfileReadNews={patchProfileReadNews}
                        readNews={readNews}
                        isLoggedIn={isLoggedIn}
                        handleReadMoreClick={handleReadMoreClick}
                    />
                </Box>
            </Box>
            <NotificationWrapper
                alertOpen={alertOpen}
                setAlertOpen={setAlertOpen}
            >
                <Alert onClose={() => setAlertOpen(false)} severity="info" sx={{ width: '100%' }}>
                    New news loaded!
                </Alert>
            </NotificationWrapper>
        </ThemeProvider>
    );
};

export default App;
