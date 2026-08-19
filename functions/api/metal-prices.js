const TROY_OUNCE_GRAMS = 31.1034768
const POUND_GRAMS = 453.59237

const fallback = {
  usdLkr: 300,
  pricesUsdPerGram: {
    gold: 135,
    silver: 1.55,
    copper: 0.025,
  },
}

const symbols = {
  gold: 'GC=F',
  silver: 'SI=F',
  copper: 'HG=F',
  usdLkr: 'USDLKR=X',
}

export async function onRequestGet() {
  try {
    const quotes = await Promise.all(
      Object.entries(symbols).map(async ([key, symbol]) => [key, await fetchYahooPrice(symbol)])
    ).then(Object.fromEntries)

    const pricesUsdPerGram = {
      gold: quotes.gold / TROY_OUNCE_GRAMS,
      silver: quotes.silver / TROY_OUNCE_GRAMS,
      copper: quotes.copper / POUND_GRAMS,
    }
    const usdLkr = quotes.usdLkr

    if (![usdLkr, ...Object.values(pricesUsdPerGram)].every(Number.isFinite)) {
      throw new Error('Missing metal quotes')
    }

    return json({ usdLkr, pricesUsdPerGram, source: 'Yahoo Finance', updatedAt: new Date().toISOString() })
  } catch {
    return json({ ...fallback, source: 'Fallback estimate', updatedAt: new Date().toISOString() })
  }
}

async function fetchYahooPrice(symbol) {
  const response = await fetch(
    `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`,
    { headers: { accept: 'application/json', 'user-agent': 'Mozilla/5.0' } }
  )

  if (!response.ok) throw new Error(`Yahoo responded ${response.status}`)
  const data = await response.json()
  const price = Number(data?.chart?.result?.[0]?.meta?.regularMarketPrice)
  if (!Number.isFinite(price)) throw new Error(`Missing price for ${symbol}`)
  return price
}

function json(body) {
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'public, max-age=300',
    },
  })
}
