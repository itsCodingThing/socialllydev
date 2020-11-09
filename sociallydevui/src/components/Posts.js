import { useState, useEffect } from "react";
import { fetchUserPost, fetchCurrentUserPost } from "../utils/api";

// function useAbortController() {
//   const abortControllerRef = React.useRef()
//   const getAbortController = React.useCallback(() => {
//     if (!abortControllerRef.current) {
//       abortControllerRef.current = new AbortController()
//     }
//     return abortControllerRef.current
//   }, [])

//   React.useEffect(() => {
//     return () => getAbortController().abort()
//   }, [getAbortController])

//   const getSignal = React.useCallback(() => getAbortController().signal, [
//     getAbortController,
//   ])

//   return getSignal
// }

export default function Posts({ children, currentUser = false }) {
  let [state, setState] = useState({
    data: [],
    isLoading: true,
    error: false,
  });

  useEffect(() => {
    let mount = true;
    if (currentUser) {
      fetchCurrentUserPost()
        .then((posts) => {
          if (mount) setState({ isLoading: false, data: posts, error: false });
        })
        .catch(() => {
          if (mount) setState({ isLoading: false, error: true, data: [] });
        });
    } else {
      fetchUserPost()
        .then((posts) => {
          if (mount) setState({ isLoading: false, data: posts, error: false });
        })
        .catch(() => {
          if (mount) setState({ isLoading: false, error: true, data: [] });
        });
    }
    return () => {
      mount = false;
    };
  }, [currentUser]);

  return children(state);
}
