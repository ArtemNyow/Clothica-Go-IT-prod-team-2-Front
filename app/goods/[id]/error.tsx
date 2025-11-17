'use client';

type Props = {
  error: Error;
};

const Error = ({ error }: Props) => {
  return <p>Error. {error.message}</p>;
};

export default Error;
