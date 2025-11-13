
import React from 'react';
import { Section } from './components/Section';
import { Card } from './components/Card';
import { DataCleaningContent, DataTypeContent, DescriptiveStatsContent, NormalityContent, OtherDistributionsContent, CorrelationContent, HypothesisContent, GraphChoiceContent, OtherConceptsContent, EDAContent } from './constants';
import { PrintButton } from './components/PrintButton';
import { Header } from './components/Header';

const App: React.FC = () => {
  return (
    <div className="min-h-screen font-sans">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 md:p-8 max-w-5xl">
        
        <Section title="1. Nettoyage des Données">
          <p className="text-slate-600 mb-6 text-lg">L'étape la plus cruciale et souvent la plus longue. Des données propres sont la base d'une analyse fiable et d'un modèle performant.</p>
          <DataCleaningContent />
        </Section>
        
        <Section title="2. Les Types de Données">
          <p className="text-slate-600 mb-6 text-lg">Le fondement de toute analyse. Le type de vos données conditionne les visualisations et les tests statistiques que vous pouvez utiliser.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <DataTypeContent />
          </div>
        </Section>

        <Section title="3. Statistiques Descriptives">
           <p className="text-slate-600 mb-6 text-lg">Résumer et décrire les caractéristiques principales d'un jeu de données.</p>
          <DescriptiveStatsContent />
        </Section>

        <Section title="4. La Loi Normale et l'Importance de la Normalité">
          <p className="text-slate-600 mb-6 text-lg">Souvent appelée "courbe de Gauss", c'est la distribution la plus célèbre en statistiques. Comprendre pourquoi elle est importante est fondamental.</p>
          <NormalityContent />
        </Section>
        
        <Section title="5. Au-delà de la Normale : Autres Distributions Utiles">
          <p className="text-slate-600 mb-6 text-lg">Le monde réel est complexe et de nombreux phénomènes ne suivent pas une loi normale. Connaître ces autres lois est essentiel pour modéliser correctement la réalité.</p>
          <OtherDistributionsContent />
        </Section>

        <Section title="6. Corrélations">
          <p className="text-slate-600 mb-6 text-lg">Mesurer la relation entre deux variables quantitatives. Attention : corrélation n'implique pas causalité !</p>
          <CorrelationContent />
        </Section>

        <Section title="7. Tests d'Hypothèses">
          <p className="text-slate-600 mb-6 text-lg">Utiliser un échantillon pour tirer des conclusions sur une population entière. C'est le cœur de la statistique inférentielle.</p>
          <HypothesisContent />
        </Section>

        <Section title="8. Visualisation de Données : Quel Graphique pour Quoi ?">
          <p className="text-slate-600 mb-6 text-lg">Chaque histoire a besoin d'un bon narrateur. Chaque analyse a besoin d'un bon graphe. Voici comment choisir le vôtre.</p>
          <GraphChoiceContent />
        </Section>
        
        <Section title="9. Autres Concepts Importants">
          <p className="text-slate-600 mb-6 text-lg">Quelques concepts clés supplémentaires pour compléter votre boîte à outils de data analyst.</p>
          <OtherConceptsContent />
        </Section>

        <Section title="10. Synthèse : L'Analyse Exploratoire (EDA) pour le Machine Learning">
          <p className="text-slate-600 mb-6 text-lg">L'EDA est la première étape cruciale du cycle de vie du Machine Learning. Elle permet de comprendre les données, guider le choix des modèles et améliorer leurs performances en reliant tous les concepts vus précédemment.</p>
          <EDAContent />
        </Section>

      </main>
      <footer className="text-center p-8 text-slate-500 border-t mt-12 print:hidden">
        <p>Bonne chance pour votre entretien !</p>
      </footer>
    </div>
  );
};

export default App;
