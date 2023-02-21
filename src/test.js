const contentStyle = {
    background: 'rgba(45,0,11,0.9)',
    borderRadius: '5px',
    border: '1px solid rgba(45,0,11,1)',
    fontFamily: 'Merienda',
    textAlign: 'center',
    marginTop:"20vh", 
    padding: '10vh',
    color: '#FFF'
  };      
  
  const animalList = [
    'rat', 'ox', 'tiger', 'rabbit', 
    'dragon', 'snake', 'horse', 'goat', 
    'monkey', 'rooster', 'dog', 'pig'
  ];
  const elementList = [ 'wood', 'fire', 'earth', 'metal', 'water' ];
  const defaultOutput = 'Enter your birth date above';
  const calculatingOutput = 'Calculating...';
  
  class Element extends React.Component {
    state = {
      output: defaultOutput
    }
  
    getOutput = (ev) => {
      const selectedDate = new Date(ev.target.value);
      const chineseYear = selectedDate.toLocaleDateString('en-US-u-ca-chinese', {year: 'numeric'});    
      if(chineseYear === 'Invalid Date'){
        this.setState({output: 'Invalid Date: Please try again'});
        return;
      }
      const intYear = parseInt(chineseYear.substr(0,4), 10);
      const animal = animalList[(intYear - 1900) % 12];
      const elemental = elementList[Math.floor((intYear - 1924) / 12) % 5];
      const article = elemental === 'earth' ? 'an' : 'a';
      this.setState({output: `You are ${article} ${elemental} ${animal}. [${chineseYear}]` });
    }
    
    setFocus = () => {
      this.setState({output: calculatingOutput});
    }
    
    render(){
      return (
        <div>
          <div style={contentStyle}>
            <h1 style={{margin: '0 0 10px'}}>Chinese Zodiac Calendar</h1>
            <Label/>
            <DateInput onBlur={this.getOutput} onFocus={this.setFocus}/>
            <Output output={this.state.output}/>
            <PhotoCredit />
          </div>
        </div>
      );
    }
  };
  
  const Label = props => {
    const labelStyle = {
      display: 'block',
      margin: '0 auto 0.5rem',
      maxWidth: '10rem',
      opacity: '0.85'
    };
    return <label style={labelStyle} htmlFor="datePick">Enter a birth date:</label>;
  };
  
  const DateInput = props => {
    const inputStyle = {
      padding: '10px',
      fontSize: '1.3rem'
    };
    return <input type="date" id="datePick" style={inputStyle} {...props}/>;
  };
  
  const Output = ({output}) => {
    const outputStyle = {
      backgroundColor: 'rgba(0,0,0,0.5)',
      border: '1px dotted #AD1818',
      borderRadius: '5px',
      fontSize: '1.3rem',
      lineHeight: '1',
      textShadow: '1px 2px 3px #000',
      marginBottom: 0,
      padding: '1.3rem 1rem 1.5rem'
    };
    
    const selectedStyle = output === defaultOutput ? {
      opacity: '0.85'
    } : {
      backgroundColor:'#AD1818',
      color: '#FFF',
      opacity:'1',
      textTransform: 'capitalize'
    };
    return <p style={{...outputStyle, ...selectedStyle }}>{ output }</p>;
  }
  
  const PhotoCredit = props => {
    return <a style={{
              position: 'fixed',
              bottom: '0',
              color:'white',
              right: '0',
              padding: '8px',
              textAlign: 'right',
              width: '148px'
            }}
             href="https://unsplash.com/@debora_rousse?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" 
             target="_blank" 
             rel="noopener noreferrer" 
             title="Download free do whatever you want high-resolution photos from Débora Rousse">
        <svg style={{
          maxWidth: '20px',
              float:'left'
        }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><title>unsplash-logo</title><path fill="rgba(255,255,255,0.5)" d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg>
      <span>Débora Rousse</span>
    </a>
  }
  const container = document.getElementById('root');
  ReactDOM.render(<Element/>, container);