import cheerio from "cheerio"
import fetch from "node-fetch"

const BASE_URL = "https://www.oxtorrent.com"

export class OxTorrentSearch implements ISearchPlugin {
  async search({ term, page = 1 }: SearchQuery) {
    let url =
      BASE_URL +
      (term ? `/recherche/${encodeURIComponent(term)}` : "/torrents/films")
    const q = await fetch(url).then((r) => r.text())
    const $ = cheerio.load(q)
    const results: Promise<SearchResult>[] = []
    const $rows = $("#contenu .listing-torrent table.table tbody tr")
    $rows.each((index, row) => {
      const title = $(row)
        .find("div.maxi a")
        .attr("title")
        ?.split(" en Torrent")[0]
      const link = $(row).find("div.maxi a").attr("href")
      const seeders = +$(row).find("td:nth-child(3)").text()
      const leechers = +$(row).find("td:nth-child(4)").text()
      if (!link || !title) {
        return
      }
      results.push(
        new Promise(async (resolve) => {
          const data = await this.getData(link)
          resolve(
            !data
              ? undefined
              : {
                  title: title,
                  summary: data.summary,
                  torrents: [
                    { url: data.url, seeders, leechers, quality: "default" },
                  ],
                  poster: data.poster ? BASE_URL + data.poster : undefined,
                }
          )
        })
      )
    })
    return await Promise.all(results)
  }

  async getData(link: string) {
    const q = await fetch(BASE_URL + link).then((r) => r.text())
    const $ = cheerio.load(q)

    const url = $("body").find("div.btn-magnet a").attr("href")
    const poster = $("body").find("#torrentsimage img").attr("src")
    const summary = $("body")
      .find("#torrentsimage div.torrentsdesc div:nth-child(5)")
      .text()
    if (!url) {
      return undefined
    }
    return { url, poster, summary }
  }
}
