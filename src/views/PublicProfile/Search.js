import React, { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import moment from "moment";
//Components
import { searchProfiles } from "store/actions/userActions";
//Styling
import {
  InputAdornment,
  InputLabel,
  Input,
  Typography,
  Box,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  ProfilePicture,
  CardContainer,
  StyledContainer,
  FlexContainer,
  TabContainer,
  NameContainer,
  DisplayMessage,
  StyledFormControl,
  StyledButton,
  PageContainer,
} from "./styles";
import { CalendarToday } from "@material-ui/icons";
import avatar from "assets/img/faces/avatar3.png";
import { setSeconds } from "date-fns";
import Loader from "components/Loading/Loader";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { search } = useSelector((state) => state.userReducer);
  const [query, setQuery] = useState("");
  const [queryEnd, setQueryEnd] = useState(false);

  const delayedQuery = debounce(async () => {
    await dispatch(searchProfiles(query));
    setQueryEnd(true);
  }, 500);

  useEffect(() => {
    setQueryEnd(false);
    delayedQuery();

    return delayedQuery.cancel;
  }, [query]);

  return (
    <PageContainer>
      <StyledFormControl>
        <InputLabel htmlFor="input-with-icon-adornment">
          Search for a user
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          fullWidth
          autoFocus
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </StyledFormControl>
      <div>
        {!query ? null : search.length ? (
          search.map((profile) => (
            <StyledContainer>
              <CardContainer>
                <TabContainer>
                  <FlexContainer>
                    <ProfilePicture
                      src={profile.image ?? avatar}
                      alt={profile.username}
                    />
                    <NameContainer>
                      <h3>
                        {profile.firstName} {profile.lastName}
                      </h3>
                      <h4>{profile.username}</h4>
                      <Box display="flex">
                        <Box mt={1} mr={1}>
                          <CalendarToday style={{ fontSize: 15 }} />
                        </Box>
                        <h6>
                          {` Joined at ${moment(profile.createdAt).format(
                            "LL"
                          )}`}
                        </h6>
                      </Box>
                    </NameContainer>
                  </FlexContainer>
                  <StyledButton
                    color="rose"
                    round
                    onClick={() => history.push(`/profile/${profile.username}`)}
                  >
                    View
                  </StyledButton>
                  <StyledButton
                    color="rose"
                    round
                    onClick={() => history.push(`/profile/${profile.username}`)}
                  >
                    Follow
                  </StyledButton>
                </TabContainer>
              </CardContainer>
            </StyledContainer>
          ))
        ) : queryEnd ? (
          <DisplayMessage>No users found.</DisplayMessage>
        ) : (
          <Loader />
        )}
      </div>
    </PageContainer>
  );
};
export default Search;
