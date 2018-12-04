
const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:8081'

const headers = {
    'Accept': 'application/json',

};


export const doLogin = (payload) =>
    //fetch(`${api}/mongoCalls/login`, {
    fetch(`${api}/login`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then((res) => res.json())
        .then((data) => {
            const token = data.token;
            localStorage.setItem('jwtToken', token);
            console.log(token);
            return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });

//     .then(res => {
//     //return res.status;
//     return res;
// }).catch(error => {
//     console.log("This is error");
//     return error;
// });

export const saveData = (details) =>
    fetch(`${api}/login/signup`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(details)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const logout = (userId) =>
    fetch(`${api}/login/logout`,{
        method: 'POST',
        headers:{
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userId)
    }).then((res) => res.json())
        .then((data) => {
            return data;
        }).catch(error=> {
        console.log("This is error" +error);
        return error;
    });

export const fetchData = (payload) =>
    fetch(`${api}/login/getUserData`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(payload)
    }).then(res => {
        return res;
    }).catch(error => {
        console.log("This is error");
        return error;
    });

 export const checkSession = () =>
     fetch(`${api}/users/redirectToHomepage`,{
         method: 'GET',
         headers:{
             ...headers,
             'Content-Type': 'application/json'
         },
         credentials: 'include',
         })
         .then((res) => res.json())
    .then((data) => {
        return data;
    }).catch(error=> {
        console.log("This is error");
        return error;
    });


export const postProject = (projectdetails) =>
   // fetch(`${api}/kafka/kafkaProducer/postproject`, {
    fetch(`${api}/mongoCalls/postproject`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdetails)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const fetchProjects = () =>
    fetch(`${api}/project/all`, {
        method: 'get',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch projects");
            return error;
        });


export const fetchProjectsWithStatus = (status) =>
    fetch(`${api}/project/status`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(status)
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch projects with status");
            return error;
        });



export const editUpdateProfile = (userdata) =>
    //fetch(`${api}/users/editUpdateProfile`, {
//    fetch(`${api}/kafka/kafkaProducer/editUpdateProfile`, {
    fetch(`${api}/login/editProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userdata)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error while updating profile");
            return error;
        });


export const fetchUserProfile = () =>
    //fetch(`${api}/users/getUserProfile`, {
    fetch(`${api}/kafka/kafkaProducer/getUserProfile`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
            console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch user Profile");
            return error;
        });

export const fetchAllProjects = () =>
    //fetch(`${api}/kafka/kafkaProducer/getAllProjects`, {
    fetch(`${api}/mongoCalls/getAllProjectsWithBids`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
           // console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch projects");
            return error;
        });

export const fetchAllProjectsForBrowse = () =>
    //fetch(`${api}/kafka/kafkaProducer/getAllProjects`, {
    fetch(`${api}/mongoCalls/getAllProjectsWithBids`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
            // console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch projects");
            return error;
        });


export const fetchProjectDetails = (projectdata) =>
    fetch(`${api}/project/add`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdata)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error while updating profile");
            return error;
        });

export const postBid = (projectdetails) =>
    fetch(`${api}/bid/addBid`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdetails)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });



export const fetchBidInfo = (projectdetails) =>
    fetch(`${api}/bid/getBidInfo`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdetails)
    }).then((res) => res.json())
        .then((data) => {
            console.log("in bids then " +data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch Bid info");
            return error;
        });

export const addMoney = (userdata) =>
    fetch(`${api}/kafka/kafkaProducer/addMoney`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userdata)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const withdrawMoney = (userdata) =>
    fetch(`${api}/kafka/kafkaProducer/withdrawMoney`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userdata)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });


export const getIncomingTransactions = () =>
    fetch(`${api}/mongoCalls/getIncomingTransactions`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    }).then((res) => res.json())
        .then((data) => {
            // console.log(data);
            return data
                ;})
        .catch(error => {
            console.log("This is error in fetch credit transactions ");
            return error;
        });


export const hireFreelancer = (projectdetails) =>
    fetch(`${api}/mongoCalls/hireFreelancer`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(projectdetails)
    }).then((res) => res.json())
        .then((data) => {return data;})
        .catch(error => {
            console.log("This is error");
            return error;
        });

  export const getJWTToken = (loginDetails) =>
            fetch(`${api}/login`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(loginDetails)
            }).then((res) => res.json())
                .then((data) => {
                  console.log("Sending JWT token and other details in response : ", data);
                  return data;
                })
                .catch(error => {
                    console.log("This is error");
                    return error;
                });

export const addMovie = (details) =>
            fetch(`${api}/admin/movie`, {
                method: 'POST',
                headers: {
                    ...headers,
                    'Content-Type': 'application/json',
                    // 'Authorization': details.jwtToken
                    'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFuLnVuZ0BzanN1LmVkdSIsImV4cCI6MTU0Mzk2MjY3MCwicm9sZSI6IkFETUlOIn0.JlKnDwIy0EdccsAejox1LRvX3Y-CzdopnZJBVUhVSprWKgFRH49TmvU7iOLZ4UXI__EHlpx57Cm2kQOAiI-0YQ'
                },
                credentials: 'include',
                body: JSON.stringify(details)
            }).then((res) => res.json())
                .then((data) => {return data;})
                .catch(error => {
                    console.log("This is error");
                    return error;
                });

export const getMovies = () =>
                  fetch(`${api}/admin/movie`, {
                      method: 'POST',
                      headers: {
                          ...headers,
                          'Content-Type': 'application/json',
                          // 'Authorization': details.jwtToken
                          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFuLnVuZ0BzanN1LmVkdSIsImV4cCI6MTU0Mzk1NDA0NCwicm9sZSI6IkFETUlOIn0.2ryuVasfDOe2CNxPi7UXJ1Y0sfAS-Lr6rWgUC8TgUYNpuTUKSh7xPhQOs5jGDUbfMUMrMrdyqeRQsyJG9cvXww'
                      },
                      credentials: 'include',
                      // body: JSON.stringify(details)
                  }).then((res) => res.json())
                      .then((data) => {
                        console.log('All Movies : '+data);
                        return data;
                      })
                      .catch(error => {
                          console.log("This is error");
                          return error;
                      });


export const getFinancials= () =>
      fetch(`${api}/admin/finance/yearly`, {
                                        method: 'GET',
                                        headers: {
                                            ...headers,
                                            'Content-Type': 'application/json',
                                            // 'Authorization': details.jwtToken
                                            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFuLnVuZ0BzanN1LmVkdSIsImV4cCI6MTU0Mzk1NDA0NCwicm9sZSI6IkFETUlOIn0.2ryuVasfDOe2CNxPi7UXJ1Y0sfAS-Lr6rWgUC8TgUYNpuTUKSh7xPhQOs5jGDUbfMUMrMrdyqeRQsyJG9cvXww'
                                        },
                                        credentials: 'include',
                                        // body: JSON.stringify(details)
                                    }).then((res) => res.json())
                                        .then((data) => {
                                          console.log('All Finances : '+data);
                                          return data;
                                        })
                                        .catch(error => {
                                            console.log("This is error");
                                            return error;
                                        });

  export const getMovieList= () =>
                  fetch(`${api}/movie/play/stats/1000`, {
                          method: 'GET',
                          headers: {
                              ...headers,
                              'Content-Type': 'application/json',
                              // 'Authorization': details.jwtToken
                              'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFuLnVuZ0BzanN1LmVkdSIsImV4cCI6MTU0Mzk4MjcwNiwicm9sZSI6IkFETUlOIn0.uBAomO-Nyua6kQ3qNYPp0Ig14yn1wJw7sGKGIeZ9P7u3L4GF7k5EMmG9keQpm8aex6zjpkRuz_dockFV89SyXg'
                          },
                          credentials: 'include',
                          // body: JSON.stringify(details)
                      }).then((res) => res.json())
                          .then((data) => {
                            console.log('All Movies : '+data);
                            return data;
                          })
                          .catch(error => {
                              console.log("This is error");
                              return error;
                          });

export const searchMovie= (movieDetails) =>
                fetch(`${api}/movie/search`, {
                        method: 'POST',
                        headers: {
                            ...headers,
                            'Content-Type': 'application/json',
                            // 'Authorization': details.jwtToken
                            'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0dWFuLnVuZ0BzanN1LmVkdSIsImV4cCI6MTU0Mzk4MjcwNiwicm9sZSI6IkFETUlOIn0.uBAomO-Nyua6kQ3qNYPp0Ig14yn1wJw7sGKGIeZ9P7u3L4GF7k5EMmG9keQpm8aex6zjpkRuz_dockFV89SyXg'
                        },
                        credentials: 'include',
                        // body: JSON.stringify(details)
                        body: JSON.stringify(movieDetails)
                    }).then((res) => res.json())
                        .then((data) => {
                          console.log('Search movies return : ', data);
                          // console.log("Values : ", data.content[0].title);
                          return data;
                        })
                        .catch(error => {
                            console.log("This is error");
                            return error;
                        });
// export const fetchSensorData = () =>
//                                     fetch(`${api}/sensorsimulation`, {
//                                         method: 'POST',
//                                         headers: {
//                                             ...headers,
//                                             'Content-Type': 'application/json'
//                                         },
//                                         credentials: 'include',
//                                     }).then((res) => res.json())
//                                         .then((data) => {
//                                             console.log('API '+data);
//                                             return data
//                                                 ;})
//                                         .catch(error => {
//                                             console.log("This is error in fetch sensors");
//                                             return error;
//                                         });
