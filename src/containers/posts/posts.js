import React, {
    useContext,
    useEffect,
    useState,
    useCallback,
    useRef,
} from 'react'
import useStyles, {
    containerVariants,
} from '../../styles/containerStyle/postsStyle'
import {
    Grid,
    Paper,
    TableContainer,
    Table,
    TableBody,
    Backdrop,
    Typography,
    AppBar,
    Toolbar,
    Tab,
    Tabs,
    CircularProgress,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from '@material-ui/core'
import AddPost from './addPost'
import SortPanel from '../../components/posts/sortPannel'
import PreRenderedPost from '../../components/posts/preRenderedPost'
import { AuthContext } from '../../store/contexts/auth/authContext'
import { PostCrContext } from '../../store/contexts/posts/postCrContext'
import { Redirect } from 'react-router-dom'
import { UserContext } from '../../store/contexts/user/userContext'
import {
    Skeleton,
    Timeline,
    TimelineItem,
    TimelineSeparator,
    TimelineDot,
    TimelineConnector,
    TimelineContent,
    Pagination,
} from '@material-ui/lab/'
import TutoLoader from '../../components/misc/loader'
import client from '../../vendors/feather'
import fetchData from '../../lib/fetchData'
import { ApiContext } from '../../store/contexts/api/apiContext'
import BlockIcon from '@material-ui/icons/Block'
import ViewComfyIcon from '@material-ui/icons/ViewComfy'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'
import EventIcon from '@material-ui/icons/Event'
import SchoolIcon from '@material-ui/icons/School'
import BackToTop from 'react-back-to-top'
import { ceil } from 'mathjs'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../store/contexts/themes/themeContext'
import { queryCache, usePaginatedQuery, useInfiniteQuery } from 'react-query'
import useIntersectionObserver from '../../lib/useIntersectionObserver'
import PostCalendar from './calendar'

export default function Posts() {
    const { authState } = useContext(AuthContext)
    const { apiState, dispatchApiData } = useContext(ApiContext)
    const { themePreference } = useContext(ThemeContext)
    const { postInfo, dispatchPostInfo } = useContext(PostCrContext)
    const { userData } = useContext(UserContext)

    const classes = useStyles()
    // handling states for the request to the API
    const [page, setPage] = useState(0)
    const [queryField, setQueryField] = useState('')
    const [trigger, setTrigger] = useState(false)

    // internal state of the component
    const [state, setState] = useState({
        firstConnexion: true,
        render: false,
        display: 'grid',
        sort: '',
        queryMade: false,
    })

    const [post_display_limit, setPostDisplayLimit] = useState(4)

    //thank you stackoverflow
    function groupBy(list, keyGetter) {
        const map = new Map()
        list.forEach((item) => {
            const key = keyGetter(item)
            const collection = map.get(key)
            if (!collection) {
                map.set(key, [item])
            } else {
                collection.push(item)
            }
        })
        return map
    }

    const fetchPosts = useCallback(
        async (
            key,
            page = 0,
            queryField = '',
            filterRequest = {},
            post_display_limit
        ) => {
            // function handling the sort Bar above the post (different that the sortPanel)

            //if the queryField is not null, we proceed to some operations, otherwise it will be a basic request
            let querySort = {}
            let postLimit = null
            switch (queryField) {
                case 'recent':
                    querySort = {
                        startAt: -1,
                    }
                    postLimit = post_display_limit
                    break
                case 'former':
                    querySort = {
                        startAt: 1,
                    }
                    postLimit = post_display_limit
                    break
                case '':
                    postLimit = post_display_limit
                default:
                    break
            }

            const res = await client.service('posts').find({
                query: {
                    ...filterRequest,
                    $limit: postLimit, //fixed value
                    $skip: page * postLimit, //it will fetch the right posts by avoiding the one already fetched
                    $sort: querySort,
                },
            })

            // this part is tricky as it's some post operation, so we needed to fetch all the post and just
            //return the limited number choosed to the api context

            let postListSorted = res.data
            let temp = []
            switch (queryField) {
                //decision about the sorting : we can only sort the tutor post ! So we don't display the student posts
                case 'room':
                    postListSorted = postListSorted.filter(
                        (post) => post.type == 'tuteur'
                    ) // we get rid of the students posts and the new length of the response is the one with the tutors post
                    res.total = postListSorted.length
                    postListSorted = groupBy(
                        postListSorted,
                        (post) => post.room.name
                    )
                    postListSorted = Array.from(
                        postListSorted,
                        ([name, value]) => value
                    ).forEach((array) => {
                        for (const elt of array) {
                            temp.push(elt)
                        }
                    })
                    // we select just the 2 post that we need, according to the limit

                    postListSorted = temp.slice(
                        page * post_display_limit,
                        (page + 1) * post_display_limit
                    )

                    break
                case 'date':
                    postListSorted = postListSorted.filter(
                        (post) => post.type == 'tuteur'
                    )
                    res.total = postListSorted.length
                    postListSorted = groupBy(
                        postListSorted,
                        (post) => post.startAt
                    )
                    postListSorted = Array.from(
                        postListSorted,
                        ([name, value]) => value
                    ).forEach((array) => {
                        for (const elt of array) {
                            temp.push(elt)
                        }
                    })

                    postListSorted = temp.slice(
                        page * post_display_limit,
                        (page + 1) * post_display_limit
                    )
                    break
                case 'subject':
                    // we don't filter the student post here as the subject in both of the types of posts !
                    postListSorted = groupBy(
                        postListSorted,
                        (post) => post.subject.name
                    )
                    postListSorted = Array.from(
                        postListSorted,
                        ([name, value]) => value
                    ).forEach((array) => {
                        for (const elt of array) {
                            temp.push(elt)
                        }
                    })
                    postListSorted = temp

                    postListSorted = temp.slice(
                        page * post_display_limit,
                        (page + 1) * post_display_limit
                    )

                    break
                default:
                    break
            }

            //if a request is made, we go to the page one because we fetch a complete different set of posts
            if (
                Object.keys(queryField).length != 0 ||
                Object.keys(filterRequest).length != 0
            )
                setPage(0)

            res.data = postListSorted
            return res
        },
        []
    )

    let {
        isError,
        resolvedData,
        error,
        isFetching,
        isLoading,
        isSuccess,
    } = usePaginatedQuery(
        [
            'fetchPosts',
            page,
            queryField,
            apiState.filterRequest,
            post_display_limit,
            apiState.subscribed,
        ],
        fetchPosts,
        {
            attempt: 1000,
            staleTime: 300 * 1000,
            enabled: true,
        }
    )

    /*const {
        status,
        data,
        isFetchingMore,
        fetchMore,
        canFetchMore,
    } = useInfiniteQuery('fetchPosts', fetchPosts, {
        getFetchMore: page + 1,
    })*/

    const loadMoreButtonRef = useRef() //when the button of "load more" on the timeline is reached, we trigger the
    //fetch more method

    /*useIntersectionObserver({
        target: loadMoreButtonRef,
        onIntersect: fetchMore,
    })*/

    // Prefetch the next page and make the request for the actual one
    useEffect(() => {
        //console.log("data timeline : ", data)
        if (isSuccess) {
            setState({ ...state, queryMade: true })
            console.log('called again, resolved data : ', resolvedData)
        }

        if (page <= ceil(resolvedData?.total / post_display_limit)) {
            queryCache.prefetchQuery(['fetchPosts', page + 1], fetchPosts)
            queryCache.setQueryData('fetchPosts', resolvedData)
        }
    }, [resolvedData, fetchPosts, page, queryField, apiState.filterRequest])

    useEffect(() => {
        //when the user create the post, it automatically reset !
        if (postInfo.resetTrigger) {
            //we reset the trigger flag when a post is created
            dispatchPostInfo({
                type: 'RESET_FLAG_CREATED_POST',
            })
        }
    }, [postInfo])

    useEffect(() => {
        if (!authState.loading && authState.isAuthenticated) {
            setState({ ...state, render: true })
        } else if (!authState.loading && !authState.isAuthenticated) {
            return <Redirect to="/" />
        }
    }, [authState])

    client.service('posts').on('created', (post) => {
        dispatchApiData({
            type: 'SUBSCRIPTION_MADE',
        }) //it is a flag in the api context used to re refetch thing
    })

    return state.render ? (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={classes.root}
        >
            <Grid container>
                <Grid
                    container
                    direction="row"
                    className={classes.gridGeneral}
                    spacing={4}
                >
                    <Grid item style={{ flex: 1 }}>
                        <SortPanel />
                    </Grid>

                    <Grid
                        item
                        className={classes.postList}
                        container
                        direction="column"
                        spacing={2}
                    >
                        <Grid
                            item
                            container
                            className={classes.sortBar}
                            style={{
                                border: themePreference.borderPost,
                            }}
                            justify="space-evenly"
                        >
                            <Typography
                                variant="overline"
                                className={classes.title}
                                /*style={{
                                    color: themePreference.textCardColor,
                                }}*/
                            >
                                {!isSuccess ? (
                                    <CircularProgress
                                        color="primary"
                                        size="1.5rem"
                                    />
                                ) : (
                                    resolvedData?.total
                                )}{' '}
                                annonces disponibles :
                            </Typography>

                            <FormControl style={{ minWidth: 100 }}>
                                <InputLabel color="primary" id="sort-label">
                                    Trier
                                </InputLabel>
                                <Select
                                    labelId="sort-label"
                                    value={state.sort}
                                    onChange={(e) => {
                                        setState({
                                            ...state,
                                            sort: e.target.value,
                                        })
                                        setQueryField(e.target.value)
                                    }}
                                >
                                    <MenuItem item value={''}>
                                        Aucune
                                    </MenuItem>
                                    <MenuItem value={'recent'}>
                                        Plus récent
                                    </MenuItem>
                                    <MenuItem value={'former'}>
                                        Plus ancien
                                    </MenuItem>
                                    <MenuItem value={'room'}>
                                        Par salle
                                    </MenuItem>
                                    <MenuItem value={'date'}>Par jour</MenuItem>
                                    <MenuItem value={'subject'}>
                                        Par matière
                                    </MenuItem>
                                </Select>
                            </FormControl>

                            {state.display == 'grid' && (
                                <FormControl style={{ minWidth: 50 }}>
                                    <Typography>
                                        Nombre d'annonces affichées
                                    </Typography>

                                    <Select
                                        labelId="select-label-post_limit"
                                        value={post_display_limit}
                                        onChange={(e) =>
                                            setPostDisplayLimit(e.target.value)
                                        }
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={6}>6</MenuItem>
                                        <MenuItem value={7}>7</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                            <Tabs
                                value={state.display}
                                onChange={(e, value) => {
                                    setState({
                                        ...state,
                                        display: value,
                                    })
                                }}
                            >
                                <Tab icon={<ViewComfyIcon />} value="grid" />
                                <Tab
                                    icon={<FormatListBulletedIcon />}
                                    value="list"
                                />
                                <Tab icon={<EventIcon />} value="calendar" />
                            </Tabs>
                        </Grid>

                        <Grid
                            item
                            style={{
                                border: themePreference.borderPost,
                                height: '70vh',
                            }}
                        >
                            {state.display == 'calendar' && (
                                <PostCalendar height="50vh" />
                            )}
                            {state.display == 'grid' ? (
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    style={{
                                        padding: '1%',
                                        height: '100%',
                                    }}
                                >
                                    {!isFetching && isSuccess ? (
                                        <Grid
                                            item
                                            container
                                            spacing={2}
                                            className={classes.gridPostList}
                                        >
                                            {resolvedData?.data.length == 0 ? (
                                                <Typography
                                                    align="center"
                                                    style={{ width: '100%' }}
                                                    variant="h2"
                                                >
                                                    Aucune annonce trouvée !
                                                </Typography>
                                            ) : (
                                                resolvedData?.data.map(
                                                    (post, index) => {
                                                        return (
                                                            <Grid item xs>
                                                                <PreRenderedPost
                                                                    userPost={
                                                                        post
                                                                    }
                                                                    key={index}
                                                                />
                                                            </Grid>
                                                        )
                                                    }
                                                )
                                            )}
                                        </Grid>
                                    ) : (
                                        <Grid
                                            item
                                            container
                                            direction="column"
                                            spacing={4}
                                            style={{ flex: 1 }}
                                        >
                                            <Grid item>
                                                <Skeleton
                                                    variant="rect"
                                                    width={'100%'}
                                                    height={150}
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Skeleton
                                                    variant="rect"
                                                    width={'100%'}
                                                    height={150}
                                                />
                                            </Grid>
                                        </Grid>
                                    )}
                                    <Grid
                                        item
                                        justify="center"
                                        container
                                        spacing={2}
                                    >
                                        <Grid item>
                                            <Pagination
                                                style={{
                                                    border:
                                                        themePreference.borderPost,
                                                }}
                                                count={ceil(
                                                    resolvedData?.total /
                                                        post_display_limit
                                                )}
                                                defaultPage={1}
                                                siblingCount={2}
                                                boundaryCount={2}
                                                showFirstButton
                                                showLastButton
                                                page={page + 1}
                                                onChange={(e, value) =>
                                                    setPage(value - 1)
                                                }
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            ) : isSuccess && state.display == 'list' ? (
                                <Grid
                                    item
                                    justify="center"
                                    className={classes.timelinePostList}
                                >
                                    {resolvedData?.data.length == 0 ? (
                                        <Typography
                                            align="center"
                                            style={{ width: '100%' }}
                                            variant="h2"
                                        >
                                            Aucune annonce trouvée !
                                        </Typography>
                                    ) : (
                                        <div>
                                            <Timeline align="alternate">
                                                {resolvedData?.data.map(
                                                    (post, index) => (
                                                        <TimelineItem>
                                                            <TimelineSeparator>
                                                                <TimelineDot>
                                                                    <SchoolIcon />
                                                                </TimelineDot>
                                                                <TimelineConnector />
                                                            </TimelineSeparator>
                                                            <TimelineContent>
                                                                {!isFetching ? (
                                                                    <PreRenderedPost
                                                                        userPost={
                                                                            post
                                                                        }
                                                                        key={
                                                                            index
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <Skeleton
                                                                        variant="rect"
                                                                        width={
                                                                            '100%'
                                                                        }
                                                                        height={
                                                                            '100%'
                                                                        }
                                                                    />
                                                                )}
                                                            </TimelineContent>
                                                        </TimelineItem>
                                                    )
                                                )}
                                            </Timeline>

                                            {/*<button
                                                ref={loadMoreButtonRef}
                                                onClick={() => fetchMore()}
                                                disabled={
                                                    !canFetchMore ||
                                                    isFetchingMore
                                                }
                                            > 
                                                {isFetchingMore
                                                    ? 'Loading more...'
                                                    : canFetchMore
                                                    ? 'Load More'
                                                    : 'Nothing more to load'}
                                                </button>*/}
                                        </div>
                                    )}
                                </Grid>
                            ) : (
                                <Grid
                                    item
                                    container
                                    direction="column"
                                    spacing={4}
                                    style={{ flex: 1 }}
                                >
                                    <Grid item>
                                        <Skeleton
                                            variant="rect"
                                            width={'100%'}
                                            height={150}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <Skeleton
                                            variant="rect"
                                            width={'100%'}
                                            height={150}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        <AddPost />
                    </Grid>
                </Grid>
            </Grid>
        </motion.div>
    ) : (
        <Grid
            container
            direction="column"
            alignContent="center"
            justify="center"
        >
            <Backdrop className={classes.backdrop} open={!state.render}>
                <TutoLoader />
            </Backdrop>
        </Grid>
    )
}
