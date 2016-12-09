import * as React from 'react';
import ReactSelect from 'react-select';
import { styles } from 'react-select';

interface Library {
    Text: string;
    Value: string;
}

interface ISearchFormProp {
    onSearchSubmit?: (q: string, libraryIds: Array<number>)=>void,
    libraries?: Library[]
}

interface ISearchFormState {
    libraryIds: number[]
}

export class SearchForm extends React.Component<ISearchFormProp, ISearchFormState> {

    constructor(props: ISearchFormProp) {
        super(props);

        this.searchHandleKeyUp = this.searchHandleKeyUp.bind(this);
        this.libraryHandleSelectChange = this.libraryHandleSelectChange.bind(this);

        this.state = {
            libraryIds: []
        };
    }

    search(q, libraryIds) {
        this.props.onSearchSubmit(q, libraryIds || []);
    }

    searchHandleKeyUp(e) {
        clearTimeout(this.timer);

        this.timer = setTimeout(function () {
            var q = this.refs.search.value.trim();
            var libraryIds = this.state.libraryIds;

            this.search(q, libraryIds);
        }.bind(this), 250);
    }

    libraryHandleSelectChange(value) {
        var libraryIds = (typeof value === 'string')
            ? [value]
            : value;
        this.setState({ libraryIds: libraryIds });

        var q = this.refs.search.value.trim();
        this.search(q, libraryIds);
    }

    render() {
        return (
            <form className="search-form">
                <div className="form-group search">
                    <i className="fa fa-search"></i>
                    <input
                        type="search"
                        className="form-control"
                        onKeyUp={this.searchHandleKeyUp}
                        placeholder="Search for documents"
                        ref="search" />
                </div>
                <div className="form-group">
                    <label htmlFor="">Filter by libraries</label>
                    <ReactSelect
                        multi
                        value={this.state.libraryIds}
                        valueKey="Value"
                        labelKey="Text"
                        simpleValue
                        options={this.props.libraries}
                        placeholder="All libraries"
                        onChange={this.libraryHandleSelectChange} />
                </div>
            </form>
        );
    }
}

SearchForm.defaultProps = {
    onSearchSubmit: () => { },
    libraries: []
}