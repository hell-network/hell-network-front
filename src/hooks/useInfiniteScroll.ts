import { useInfiniteQuery } from 'react-query'
import { DEFAULT_PAGE_COUNT } from 'config/constants/default'

type UseInfiniteScrollProps = {
  fetch: (props: any) => any
  params: any
  queryKey: string[]
}

const useInfiniteScroll = ({ fetch, params, queryKey = ['queryKey'] }: UseInfiniteScrollProps) => {
  // const { observerRef, isIntersecting } = useIntersectionObserver();
  const getFetchForInfiniteScroll = async ({ pageParam = 1 }) => {
    const { data } = await fetch({
      ...params,
      pageNo: pageParam,
      pageSize: DEFAULT_PAGE_COUNT,
    })
    const {
      // pageNo, pageSize, totalCount, totalPageCount,
      nextPageNo,
      isLast,
    } = data.meta

    return {
      result: data,
      nextPage: nextPageNo,
      isLast,
    }
  }

  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading, isFetchingNextPage, status } =
    useInfiniteQuery(queryKey, getFetchForInfiniteScroll, {
      getNextPageParam: (lastPage) => {
        if (lastPage.isLast) {
          return false
        }
        return lastPage.nextPage
      },

      refetchOnMount: true,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    })

  return {
    data,
    error,
    status,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  }
}

export default useInfiniteScroll
