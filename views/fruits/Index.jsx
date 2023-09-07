const React = require("react")


class Index extends React.Component {
  render() {
    const { fruits } = this.props
    return(
      <div>
        <h1> Fruits Index Page! </h1>
        <nav>
          <a href="/fruits/new">Create a New Fruit</a>
        </nav>
        <ul>
          {
            fruits.map((fruit, i) => {
              return (
                <li key={i}>
                  The{' '}
                    <a href={`/fruits/${fruit._id}`}>
                      {fruit.name}
                    </a>
                    {' '}
                    is {fruit.color} <br></br>
                    {
                      fruit.readyToEat ? 
                        `It is ready to eat`
                      : 
                        `It is not ready to eat`
                    }
                                      <br />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

module.exports = Index