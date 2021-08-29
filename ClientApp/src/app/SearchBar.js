import React from 'react'
import { 
    Form,
    FormGroup,
    Input,
    Button, 
    UncontrolledTooltip
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SearchBar = ({ onSearchBarSubmit, onIptSearchChange }) => {
    return (
        <Form className="pb-2 w-auto" inline onSubmit={onSearchBarSubmit}>
            <FormGroup className="w-100 justify-content-end">
                <div className="d-inline-flex w-50 justify-content-end">
                    <Input
                        id="iptSearch"
                        className="d-inline-block" 
                        type="text" 
                        required
                        onChange={onIptSearchChange}
                        placeholder="Search item by name..." 
                    />
                </div>
                <Button id="searchBtn" className="ml-1" type="submit" color="primary">
                    <FontAwesomeIcon icon={['fas', 'search']} />
                </Button>

                <UncontrolledTooltip target="searchBtn" placement="top">
                    Search it
                </UncontrolledTooltip>
            </FormGroup>
        </Form>
    )
}

export default SearchBar
