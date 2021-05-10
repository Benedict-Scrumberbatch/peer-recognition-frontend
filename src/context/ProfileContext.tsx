import React from "react";

const ProfileContext = React.createContext({});

class ProfileProvider extends React.Component{
    state = {
        userProfile : {}
    }

    setUserProfile = (userProfile : any) => {
        this.setState((prevState) => ({ userProfile }))
    }


    render() {
        const { children } = this.props
        const { userProfile } = this.state
        const { setUserProfile } = this
    
        return (
          <ProfileContext.Provider
            value={{
              userProfile,
              setUserProfile,
            }}
          >
            {children}
          </ProfileContext.Provider>
        )
      }
}

export default ProfileContext;

export { ProfileProvider }