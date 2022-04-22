const Filter = (props) =>  (
    <div>
        <span>filter shown with </span>
        <input value={props.filterText} onChange={props.onChange} />
    </div>
);

export default Filter;