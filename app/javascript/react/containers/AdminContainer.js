import React, { Component } from 'react'

class AdminContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        admin : false
    }
  }

  componentDidMount() {
   fetch(`/api/v1/admin`, {
     credentials: 'same-origin'
   })
   .then(response => {
     if (response.ok) {
       return response;
     } else {
       let errorMessage = `${response.status} (${response.statusText})`,
         error = new Error(errorMessage);
       throw(error);
     }
   })
   .then(response => response.json())
   .then(body => {
     this.setState({ admin: body.admin })
   })
   .catch(error => console.error(`Error in fetch: ${error.message}`));
 }

  render() {
    let admin = this.state.admin;

    return (
      <div>
        Admin section {admin.toString()}
      </div>
    )
  }
}


export default AdminContainer;
