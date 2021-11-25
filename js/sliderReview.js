const textReviews = document.querySelector("#textReview");

let reviews = [];
reviews[0]="⭐⭐⭐⭐⭐Il miglior sito dove faccio il mio shopping online!";
reviews[1]="⭐⭐⭐✖✖Pagamento super sicuro e spedizione lenta";
reviews[2]="⭐⭐✖✖✖ Prodotti di scarsa qualità";
reviews[3]="⭐⭐⭐⭐⭐Ottimo rapporto qualità prezzo";
reviews[4]="⭐⭐⭐⭐⭐Eccellente imballaggio dei prodotti e spedizione veloce"
reviews[5]="⭐⭐⭐✖✖ Miglior servizio clienti di sempre, ma assortimento scarso";
reviews[6]="⭐⭐✖✖✖ Reso super veloce ed efficace, ma scarso servizio clienti";

let y = 0;
function changeReview() {
    textReviews.textContent = reviews[y];
    y=y+1;
    if (y > 6){
      y = 0;
   }
  }
  
  window.addEventListener('DOMContentLoaded', (event) => {
    setInterval(changeReview, 3000);
  });