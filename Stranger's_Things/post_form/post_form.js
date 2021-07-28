const userLoggedIn = () => {
	return localStorage.getItem("auth-token");
  };

  if (userLoggedIn()) {
    
$(".form").on("submit", (e) => {
	
	e.preventDefault();
	const adTitle = $("#title").val(); 
	const adDescription = $("#description").val(); 
	const adPrice = $("#price").val(); 
	const adLocation = $("#location").val();
	console.log(adTitle, adDescription, adPrice, adLocation)

	const formBody= {
		title: adTitle,
		description: adDescription,
		price: adPrice,
		location: adLocation
	};
	console.log(formBody)
	postAd(formBody)
	
});

const postAd = async (formBody) => {
	try{
		const BASE_URL = "https://strangers-things.herokuapp.com/api/2101-LSU-RM-WEB-PT";
		const authToken = localStorage.getItem("auth-token")
		const builtToken = `Bearer ${authToken}`
		const builtURL = `${BASE_URL}/posts`
		console.log(builtURL)
		
		const response = await fetch(builtURL, {
			method: "POST",
  			headers: {
    				'Content-Type': 'application/json',
   					 'Authorization': builtToken
  },
  			body: JSON.stringify({
				post: formBody

			  }),
		});
		const data = await response.json();
		location.href = "/index.html";
	} catch(err) {
		console.error(err)
	}
};

} else {
	alert("Must Log In!");
}

  
