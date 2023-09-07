import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const PostViewSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#717171">
      <Skeleton count={20} />
    </SkeletonTheme>
  )
}
export default PostViewSkeleton
