import { EnthusiasmAction } from "../actions";
import { IStoreState } from "../../types/inex";
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from "../constants";
import { combineReducers } from "redux";
import {
  ADD_TODO, TOOGLE_TODO, SET_VISIBILITY_FILTER, SHOW_MY_SELF_NAME,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
} from "../constants";
import { VisibilityFilters } from "../actions";


class TaskStatus {
  text: string;
  completed: boolean;

  constructor(text: string, completed: boolean) {
    this.text = text;
    this.completed = completed;
  }
}

const { SHOW_ALL } = VisibilityFilters;

export function enthusiasm(state: IStoreState, action: EnthusiasmAction): IStoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return {
        ...state, enthusiasmLevel: state.enthusiasmLevel + 1
      };
    case DECREMENT_ENTHUSIASM:
      return {
        ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel)
      };
  }
  return state;
}


export function counterReduce(state = 0, action: any) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function visibilityFilter(state = SHOW_ALL, action: any) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

function todos(state = [], action: any) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOOGLE_TODO:
      return state.map((todo: TaskStatus, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          });
        }
        return todo;
      });
    default:
      return state;
  }
}


function invokeSelfName(state = "This is MySelf", action: any) {
  switch (action.type) {
    case SHOW_MY_SELF_NAME:
      return state;
    default:
      return state;
  }
}


function selectedSubreddit(state = "reactjs", action: any) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}


function posts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action: any) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        disInvalidate: false
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}


function postsBySubreddit(state = {}, action: any) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      });
    default:
      return state;
  }
}


const rootReducer = combineReducers({
  count: counterReduce,
  visibilityFilter,
  todos,
  invokeSelfName,
  postsBySubreddit,
  selectedSubreddit
});

export default rootReducer;

