interface ISearch {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}
const Search = (props: ISearch) => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        placeholder="Find the best movies and series"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
