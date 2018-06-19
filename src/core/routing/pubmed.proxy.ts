import url from "url";
import httpProxy from 'express-http-proxy'

const pubmedHost = 'https://eutils.ncbi.nlm.nih.gov'
const pubmedPath = '/entrez/eutils/esummary.fcgi'

export const pubmedProxy = () => {
    return httpProxy(pubmedHost, {
        proxyReqPathResolver: req => pubmedPath + '?' + url.parse(req.originalUrl).query
    })
}