//when the componenet first mounts he need to
//make a request for users.
//when the user search further


//we will need to use the useState + useEffect

//the list of users needs to be in the useState
// the triger = the value of the input and every time the
// user retype he go and ask for more info.

//2 calls to useState
//1 call to useEffect

// 1st run will be undifiend because it is only render.
// 1st ajax request.
// 2nd run will be when the user type in the search
// 2nd ajax request for the data.

//we need to look on incremental search.

//to avoid the issue that we had in the excerceice:
//that the user change his text field we can compare
//it on the ajax request:
 function User({ id }) {
    const [user, setUser] = useState();
    useEffect(() => {
        let abort;
        (async () => {
            const {data} = await axios.get(`/user/${id}.json`);
            if (!abort) {
                setUser(data.user);
            }
        })();
        return () => {
            abort = true;
        };
    }, [id]);
