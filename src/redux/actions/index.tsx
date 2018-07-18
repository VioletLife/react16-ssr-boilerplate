import * as constants from "../constants/index";
import {
  ADD_TODO, SET_VISIBILITY_FILTER, TOOGLE_TODO, SHOW_MY_SELF_NAME,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  INVALIDATE_SUBREDDIT, SELECT_SUBREDDIT
} from "../constants";
import fetch from "cross-fetch";

export interface IIncrementEnthusiasm {
  type: constants.INCREMENT_ENTHUSIASM
}

export interface IDecrementEnthusiasm {
  type: constants.DECREMENT_ENTHUSIASM
}


export type EnthusiasmAction = IIncrementEnthusiasm | IDecrementEnthusiasm;


export function incrementEnthusiasm(): IIncrementEnthusiasm {
  return {
    type: constants.INCREMENT_ENTHUSIASM
  };
}


export function decrementEnthusiasm(): IDecrementEnthusiasm {
  return {
    type: constants.DECREMENT_ENTHUSIASM
  };
}


export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE"
};


export function addTodo(text: any) {
  return {
    type: ADD_TODO,
    text
  };
}


export function toggleTodo(index: any) {
  return {
    type: TOOGLE_TODO,
    index
  };
}

export function setVisibilityFilter(filter: any) {
  return {
    type: SET_VISIBILITY_FILTER,
    filter
  };
}


export function showMySelf(selfName: string) {
  return {
    type: SHOW_MY_SELF_NAME,
    selfName
  };
}


function requestPosts(subreddit: any) {
  return {
    type: REQUEST_POSTS,
    subreddit
  };
}

function receivePosts(subreddit: any, json: any) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(function(child: any) {
      return child.data;
    }),
    receivedAt: Date.now()
  };
}


export function selectSubreddit(subreddit: any) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit
  };
}

export function invalidateSubreddit(subreddit: any) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  };
}


export function fetchPosts(subreddit: any) {
  return function(dispatch: any) {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json(),
        error => console.log("An error occurred", error)
      ).then(json => dispatch(receivePosts(subreddit, json)));
  };
}


function shouldFetchPosts(state: any, subreddit: any) {
  const posts = state.postsBySubreddit[subreddit];
  if (!posts) {
    return true;
  }
  else if (posts.isFetching) {
    return false;
  }
  else {
    return posts.didInvalidate;
  }
}


export function fetchPostsIfNeeded(subreddit:any) {
  return (dispatch:any, getState:any) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit));
    }
    else {
      return Promise.resolve();
    }
  };
}









