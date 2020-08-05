export const queryConfig = {
    // in ms
    queries: {
        refetchOnWindowFocus: false,
        retryDelay: 60000, // make this to false when you'll install socketIO
        staleTime: 300 * 1000,
    },
}
