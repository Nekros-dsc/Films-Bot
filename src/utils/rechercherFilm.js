export default function rechercherSerie (motCle, series) {
  const regex = new RegExp(motCle, 'i')
  return series.find(serie => regex.test(serie.nom))
}
