import authReducer from "./auth";
import * as actionTypes from "../actions/actionsTypes";

describe("authReducer", () => {
  it("should return initialState by default", () => {
    expect(authReducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
    });
  });

  it("should store the token upon login", () => {
    expect(
      authReducer(undefined, {
        type: actionTypes.AUTH_SUCCESS,
        token: "gerwgf",
      }),
    ).toEqual({
      token: "gerwgf",
      userId: undefined,
      error: null,
      loading: false,
    });
  });
});
