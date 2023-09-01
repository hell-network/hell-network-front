export const getOriginUrl = () => {
  return typeof window !== 'undefined'
    ? `${window.location.origin}`
    : `${process.env.NEXT_PUBLIC_DEFAULT_ORIGIN_URL}`;
};

export const getApiServerUrl = () => {
  return typeof window !== 'undefined' &&
    window.location.origin.includes(
      process.env.NEXT_PUBLIC_API_SERVER_SERVICE_NAME
    )
    ? `${window.location.origin}:8080`
    : process.env.NEXT_PUBLIC_DEFAULT_API_SERVER_URL;
};

type CallbackUrlType = 'google' | 'naver' | 'kakao' | 'apple';

export const getCallbackUrl = (type: CallbackUrlType) => {
  return `${
    typeof window !== 'undefined'
      ? `${window.location.origin}`
      : process.env.NEXT_PUBLIC_DEFAULT_ORIGIN_URL
  }/oauth/callback/${type}`;
};
