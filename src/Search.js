

async doSearch(search) {
  console.log('searching');
  this.setState({ results: [] });
  this.setState({ isLoading: true });
  const url = encodeURI(`http://www.omdbapi.com/?s=${this.state.search}&plot=short&r=json&apikey=${omdbKey}`);
  console.log(url);
  const response = await fetch(url);
  const body = await response.json();
  setTimeout(()=>{
    if(body.Response === 'True'){
      this.setState({ isNotFound: false });
      this.setState({ isLoading: false });
      this.setState({ results: body.Search });
    } else{
      this.setState({ isLoading: false });
      this.setState({ isNotFound: true });
      this.setState({ results: [] });
    }
  },1000);
}

