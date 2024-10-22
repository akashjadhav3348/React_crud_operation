import React from 'react'

const Home = () => {
  return (
    <>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://yug-webdev.com/wp-content/uploads/2023/03/tech-stack-1170x700.webp" className="d-block w-100" alt="..." height={500} width={500}/>
          </div>
          <div className="carousel-item">
            <img src="https://img.freepik.com/premium-vector/programmer-working-program-web-developer-coding-computer-screen-with-code-script-open-windows-coder-engineer-vector-concept-illustration-development-programmer-programming-coding_102902-3910.jpg?w=826" className="d-block w-100" alt="..."  height={500} width={500} />
          </div>
          <div className="carousel-item">
            <img src="https://www.nagpurit.com/wp-content/uploads/2023/03/Untitled-design-23.png" className="d-block w-100" alt="..."  height={500} width={500} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </>
  )
}

export default Home
