import React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Tiles from './components/Tiles';
import Searchbar from './components/Searchbar';
import SideDrawer from './components/SideDrawer';
import { theme } from './theme';
import ApiService from './services/ApiService';

const drawerWidth = 240;

const App = () => {
    const apiService = new ApiService();

    const [mobileDrawerOpen, setMobileDrawerOpen] = React.useState(false);

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

    React.useEffect(() => {
        const fetchData = async () => {
            await apiService.getNews({ limit: 16 }).then((data) => {
                if (!data) return;
                setNews(data.results || []);
                setNextNewsUrl(data.next);
            });
            await apiService.getTags().then((data) => {
                if (!data) return;
                setTags(data || []);
            });
            await apiService.getAuthenticatedUserProfile().then((data) => {
                if(!data) return;
                setSelectedPresets(data.savedsets);
            });
        };
        fetchData();
    }, []);

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
            setTags(data || []);
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
            await apiService.getNews({
                limit: 16,
                offset: nextNewsUrl.split('offset=')[1].split('&')[0],
                summary: summaryFilter,
                source: sourceFilter,
                tags: tagsFilter
            }).then((data) => {
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

    React.useEffect(() => {
        const listener = () => handleScroll(news, nextNewsUrl, isFetchingNews);
        window.addEventListener('scroll', listener);
  
        return () => {
            window.removeEventListener('scroll', listener);
        };
    }, [news, nextNewsUrl, isFetchingNews]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Navbar 
                    drawerWidth={drawerWidth}
                    handleDrawerToggle={handleDrawerToggle}
                    setSelectedPresets={(presets) => setSelectedPresets(presets)}
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
                        nextNewsUrl={nextNewsUrl}
                        isFetchingNews={isFetchingNews}
                        isFetchingNewsError={isFetchingNewsError}
                    />
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default App;
