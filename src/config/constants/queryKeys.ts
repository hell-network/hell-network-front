export const queryKeys = {
  registerPost: ['registerPost'],
  getPosts: (boardId: number, id: number) => ['getPosts', boardId, id],
  getPostById: (id: number) => ['getPostById', id],
  getBoard: ['getBoard'],
  searchPosts: (searchString) => ['searchString', searchString],
}
