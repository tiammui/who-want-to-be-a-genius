import {
  useQuery,
  useMutation,
  QueryClient,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';
import axiosInstance from '.';
import { toast } from 'react-toastify';

export const useQueryWrapper = (key, url, options) => {
  const getAPICall = async () => {
    const response = await axiosInstance.get(url);
    return response;
  };
  return useQuery(key, getAPICall, options);
};

export const useQueriesWrapper = (key, urls, options) => {
  if (!urls) return [];
  const getAPICall = async () => {
    const response = await Promise.all(
      urls.map((url) => axiosInstance.get(url))
    ).then((res) => res);
    return response;
  };
  return useQuery(key, getAPICall, options);
};

export const postRequest = async ({ url, data }) => {
  const response = await axiosInstance.post(url, data);
  return response?.data || response;
};

export const putRequest = async ({ url, data }) => {
  const response = await axiosInstance.put(url, data);
  return response?.data || response;
};
export const patchRequest = async ({ url, data }) => {
  const response = await axiosInstance.patch(url, data);
  return response?.data || response;
};

export const deleteRequest = async ({ url, data }) => {
  const config = { data };
  const response = await axiosInstance.delete(url, config);
  return response?.data || response;
};

// TODO: write JSDocs for this function
export const useMutationWrapper = (makeAPICall, onSuccess, onError) => {
  return useMutation(makeAPICall, {
    onSuccess: (res) => {
      if (onSuccess) {
        toast.success('Gotten');
        onSuccess(res);
      }
    },

    onError: (error) => {
      if (onError) {
        onError(error);
      } else {
        const err = error;
        const message = err?.response?.data?.message;
        if (Array.isArray(message)) {
          message.map((errorMsg) =>
            toast.error(`${errorMsg ?? 'An error occured'}`, {
              autoClose: false,
            })
          );
        } else {
          toast.error(`${message ?? 'An error occured'}`);
        }
      }
    },
  });
};

// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       staleTime: 1000 * 600, // this is in millisecond
//       retry: 0,
//     },
//   },
// });

export const queryClient = new QueryClient({});
