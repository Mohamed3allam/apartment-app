import Link from "next/link";
import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Projects = ({ projects }: { projects: string[] }) => {
  return (
    <Container className="py-5">
      <h2 className="mb-4">Browse by Project</h2>
      <Row className="g-3">
        {projects.map((project) => (
          <Col xs={6} md={3} key={project}>
            <Card className="text-center p-3 shadow-sm">
              <Card.Body>
                <Card.Title>{project}</Card.Title>
                <Link href={`/apartments?project=${project.toLowerCase()}`}>
                  <Button variant="outline-primary" size="sm">
                    Explore
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Projects;
