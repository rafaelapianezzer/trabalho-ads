import React from 'react';
import logo from "../../public/logo.jpeg";
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';

const Header = ({ selectedFloor, onSelectFloor, selectedFilter, onSelectFilter }) => {
    const floorOptions = ['G1', 'G2', 'G3'];
    const filters = [
        { key: 'all', label: 'Todas' },
        { key: 'free', label: 'Livres' },
        { key: 'occupied', label: 'Ocupadas' }
    ];

    const currentFilterLabel = filters.find(f => f.key === selectedFilter)?.label || 'Todas';

    return (
        <div className="d-flex flex-column shadow-sm">
            <div className="mb-2 d-flex justify-content-center">
                <img src={logo} alt="Logo" className="img-fluid w-25" />
            </div>
            <div className="d-flex align-items-center justify-content-center justify-content-md-between px-5 gap-4 py-2">
                <ButtonGroup>
                    {floorOptions.map(g => (
                        <Button
                            key={g}
                            variant={selectedFloor === g ? 'primary' : 'outline-primary'}
                            className={`btn-sm px-2 px-md-4 fs-6 fs-md-5 ${selectedFloor === g ? 'text-white' : ''}`}
                            onClick={() => onSelectFloor(g)}
                        >
                            {g}
                        </Button>
                    ))}
                </ButtonGroup>

                <Dropdown>
                    <Dropdown.Toggle
                        variant="outline-primary"
                        className="btn-sm px-2 px-md-4 fs-6 fs-md-5"
                        id="filterDropdown"
                    >
                        {currentFilterLabel}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {filters.map(f => (
                            <Dropdown.Item
                                key={f.key}
                                active={selectedFilter === f.key}
                                onClick={() => onSelectFilter(f.key)}
                                className="fs-6 fs-md-5"
                            >
                                {f.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
};

export default Header;
