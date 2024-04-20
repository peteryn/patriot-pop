document.addEventListener('DOMContentLoaded', function() {
    var clearSearch = document.getElementById('clear-btn');
    var searchBar = document.getElementById('search-bar');
    var searchForm = document.getElementById('search-form');
    
    clearBtn.addEventListener('click', function() {
        searchBar.value = '';
        searchResults.innerHTML = '';
    });
    searchBar.addEventListener('keydown', function(event) {
        console.log(`Key pressed in search bar: ${event.key}`);
    });
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault(); 
        var searchQuery = searchBar.value.trim();
        if (!searchQuery) {
            alert('Empty Search');
            return; 
        }
        var invalidCharsPattern = /[!#%*]/;
        if (invalidCharsPattern.test(searchQuery)) {
            alert('Search term contains invalid characters');
            return; 
        }
        console.log(`Search submitted with query: ${searchQuery}`);
        performSearch(searchQuery); 

});
});
function performSearch(query) {
    console.log(`Performing search with query: ${query}`);
    //server stuff that will be added in the future w database
    alert(`Search for: ${query}`);
}
