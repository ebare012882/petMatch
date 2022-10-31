import React, { useEffect, useState } from 'react' 
import { Card, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { petIndex } from '../../api/pet'

// const cardContainerLayout = {
//     display: 'flex',
//     flexFlow: 'row wrap',
//     justifyContent: 'center'
// }

const PetIndex = ({ user, msgAlert }) => {

    const [allPets, setAllPets] = useState([])

    useEffect(() => {
        petIndex(user)
        .then(res => {
            setAllPets(res.data.pets)
        })
        .catch((error) => {
            msgAlert({
                heading: 'Failure',
                message: 'Index Pets Failure' + error,
                variant: 'danger'
            })
        })
    }, [])

	const dogPic = require('../shared/images/defaultDog.png')
	const catPic = require('../shared/images/defaultCat.png')
	
	const setImage = (type)=>{
		if(type == "Dog"){
			return <img fluid  src={dogPic} />
		}else{
			return <img fluid  src={catPic} />
		}
	}
    const petCards = allPets.map(pet => (
        <Card key={ pet.id } style={{ margin: 10, width: '40%', display: 'flex'}} border="primary">
           
            <Card.Body>
                <Card.Text>
                
                    <Container fluid className="justify-center">
                    {/* <Link to={ `/petmatch/${pet._id}` }>View { pet.name }</Link> */}
                    <Row>
                        <Col><Link to={ `/petmatch/${pet._id}` }>{setImage(pet.typeOfPet)}</Link></Col>
                        <Col> 
                            <Card.Title>{ pet.name }</Card.Title>
                            <Card.Text style ={{color:'#eb50b8'}}>{ pet.typeOfPet}</Card.Text>
                        </Col>
                    
                    </Row>
					</Container>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        // <div className='container-md' style={ cardContainerLayout }>
           <Container style={{display:"flex", justifyContent:"space-between", width:"80%"}}>
            <Row>
            { petCards }
            </Row>
           </Container>
          
        
    )
}

export default PetIndex