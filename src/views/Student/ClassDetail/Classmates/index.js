import React from 'react'
import PropTypes from 'prop-types'
import SkModal from '../../../components/SkModal/SkModal'

function Classmates(props) {
    const [shouldShowModal, showModal] = React.useState(true)

    const renderClassmatesCell = () => {
        let { students, cl } = props
        let count = students.length

        return (
            shouldShowModal &&
            <SkModal closeModal={() => showModal(false)}>
                <div style={{ display: "flex", flexDirection: "row", paddingTop: "12px", justifyContent: "space-between", alignItems: "center", marginLeft: "6px", marginRight: "6px", marginBottom: "8px" }}>
                    <div style={{ fontWeight: "bold", fontSize: "32px", color: '#' + cl.color }}>{cl.name}</div>
                    <div style={{ fontSize: "24px" }}>
                        <i className='fas fa-users' style={{ color: '#4A4A4A', marginRight: "6px" }} />
                        {count}
                    </div>
                </div>
                <hr></hr>
                <br />
                {
                    students.map(s => <div key={s.id} style={{ display: "flex", flexDirection: "row", paddingTop: "8px", justifyContent: "space-between", alignItems: "center", marginLeft: "6px", marginRight: "6px" }}>
                        <div style={{ fontWeight: "bold", fontSize: "22px" }}>{s.name_first} {s.name_last}</div>
                        <div style={{ fontWeight: "bold", fontSize: "22px" }}>{ }</div>
                    </div>)
                }
                <br />
            </SkModal>
        )
    }

    return (
        <div>
            <i
                className='fas fa-users'
                title='Share class'
                onClick={() => showModal(true)}
            />
            {renderClassmatesCell()}
        </div>
    )
}

Classmates.propTypes = {
    cl: PropTypes.object
}

export default Classmates
