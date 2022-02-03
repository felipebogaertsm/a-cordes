import { Container, Row, Col } from 'react-bootstrap'
import React from 'react'

function Footer() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        &copy; Felipe Bogaerts de Mattos
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
