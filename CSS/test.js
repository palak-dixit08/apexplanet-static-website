async function getTestData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();
    console.log("Connection successful! User's name is:", data.name);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

// Ensure this exact line is at the bottom to actually RUN the function!
getTestData();