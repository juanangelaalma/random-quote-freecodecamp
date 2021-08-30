import React, { useState, useEffect } from "react";
import QuoteIcon from "icons/QuoteIcon";
import TwitterIcon from "icons/TwitterIcon";
import ColorPicker from "components/ColorPicker";
import useNetwork from "hooks/useNetwork";


const App = () => {
  const randomNumber = Math.floor(Math.random() * 101)
  const [quote, setQuote] = useState({})
  const [indexRandom, setIndexRandom] = useState(randomNumber)
  const [colorTheme, setColorTheme] = useState('#2C3E50')


  useEffect(() => {
    async function fetchData() {
        const quotes = await fetchingQuote()
        quotes ? setQuote(quotes.quotes[indexRandom]) : setQuote({})
      }
    fetchData()
  }, [indexRandom])

  useEffect(() => {
    document.querySelector('.wrapper').style.backgroundColor = colorTheme
    document.querySelector('#text').style.color = colorTheme
    document.querySelector('.quote-icon').style.fill = colorTheme
    document.querySelector('#author').style.color = colorTheme
    document.querySelector('#tweet-quote').style.backgroundColor = colorTheme
    document.querySelector('#new-quote').style.backgroundColor = colorTheme
  }, [colorTheme])

  const fetchingQuote = async () => {
    const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
    try{
      let res = await fetch(url)
      return await res.json()
    }catch(err){
      console.log(err)
    }
  }

  const handleNewQuote = () => {
    setIndexRandom(randomNumber)
  }

  const {quote: currentQuote, author: currentAuthor} = quote

  const urlTwitter = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
  encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)

  const handleNetworkChange = (online) => {
    alert(online ? 'We just online' : 'We are offline')
  }

  const online = useNetwork(handleNetworkChange)

  return (
    <div className="wrapper">
      <ColorPicker colorTheme={colorTheme} setColorTheme={setColorTheme} />
      <div id="quote-box">
        <span id="text">
          <QuoteIcon />
          {currentQuote}
        </span>
        <span id="author">{currentAuthor}</span>
        <a id="tweet-quote" target="_blank" href={urlTwitter}>
          <TwitterIcon />
        </a>
        <button id="new-quote" onClick={handleNewQuote}>New quote</button>
      </div>
    </div>
  );
};

export default App;
