import moment from 'moment';
import isNil from 'lodash/isNil';
import { Posts } from 'api/posts/types';

type UseFormatDateProps = {
  posts: Posts;
  format?: string;
};
const useFormatDate = ({
  posts,
  format = 'YYYY.MM.DD HH:mm',
}: UseFormatDateProps) => {
  const date = isNil(posts?.regDate)
    ? moment(posts?.editDate).format(format)
    : moment(posts?.regDate).format(format);

  return date;
};

export default useFormatDate;
