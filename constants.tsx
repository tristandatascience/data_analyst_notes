
import React from 'react';
import { Card } from './components/Card';
import { CategoricalIcon, NumericIcon, CentralTendencyIcon, DispersionIcon, LightbulbIcon, WarningIcon, CleaningIcon, BrainIcon, BellCurveIcon, DistributionIcon } from './components/Icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, ScatterChart, Scatter, ReferenceLine, AreaChart, Area } from 'recharts';

// --- DATA FOR CHARTS ---
const barData = [
  { name: 'France', Ventes: 4000 },
  { name: 'USA', Ventes: 3000 },
  { name: 'Japon', Ventes: 2000 },
  { name: 'Allemagne', Ventes: 2780 },
];

const histogramData = [
  { range: '10-20', count: 5 },
  { range: '20-30', count: 12 },
  { range: '30-40', count: 25 },
  { range: '40-50', count: 18 },
  { range: '50-60', count: 7 },
];

const lineData = [
  { name: 'Jan', 'Ventes 2023': 400 },
  { name: 'Fév', 'Ventes 2023': 300 },
  { name: 'Mar', 'Ventes 2023': 600 },
  { name: 'Avr', 'Ventes 2023': 800 },
  { name: 'Mai', 'Ventes 2023': 500 },
];

const scatterDataPositive = [
  { x: 10, y: 20 }, { x: 20, y: 35 }, { x: 30, y: 30 }, { x: 40, y: 55 },
  { x: 50, y: 60 }, { x: 60, y: 80 }, { x: 70, y: 75 },
];
const scatterDataNegative = [
  { x: 10, y: 80 }, { x: 20, y: 65 }, { x: 30, y: 70 }, { x: 40, y: 45 },
  { x: 50, y: 40 }, { x: 60, y: 20 }, { x: 70, y: 25 },
];

const qqPlotData = [
    { theory: -2, sample: -2.2 },
    { theory: -1.5, sample: -1.6 },
    { theory: -1, sample: -0.9 },
    { theory: -0.5, sample: -0.4 },
    { theory: 0, sample: 0.1 },
    { theory: 0.5, sample: 0.6 },
    { theory: 1, sample: 1.1 },
    { theory: 1.5, sample: 1.7 },
    { theory: 2, sample: 2.1 },
];

const bellCurveData = Array.from({ length: 41 }, (_, i) => {
    const x = -4 + i * 0.2;
    const y = (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * x * x);
    return { x: x.toFixed(1), y };
});


export const DataCleaningContent = () => (
    <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
            <Card title="Gestion des Valeurs Manquantes (NA)" icon={<CleaningIcon />}>
                <p>Détection : <code className="text-sm">df.isnull().sum()</code>. Le choix de la stratégie dépend du contexte.</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                    <li><strong>Suppression :</strong>
                        <ul className="list-['-_'] list-inside ml-4 text-slate-500">
                            <li><strong>Lignes (listwise) :</strong> Simple, mais peut entraîner une perte d'information.</li>
                            <li><strong>Colonnes :</strong> Si une variable a un très grand pourcentage de valeurs manquantes.</li>
                        </ul>
                    </li>
                    <li><strong>Imputation (remplacement) :</strong>
                        <ul className="list-['-_'] list-inside ml-4 text-slate-500">
                            <li><strong>Simple :</strong> Moyenne, médiane (robuste), mode.</li>
                            <li><strong>Avancée :</strong> Imputation par KNN (k-plus proches voisins), interpolation (séries temporelles).</li>
                        </ul>
                    </li>
                </ul>
            </Card>
            <Card title="Gestion des Doublons" icon={<CleaningIcon />}>
                <p>Des enregistrements identiques qui peuvent biaiser les analyses et les métriques.</p>
                <ul className="list-disc list-inside mt-2 space-y-2">
                    <li><strong>Détection :</strong>
                        <p className="text-slate-500">Utiliser des fonctions comme <code className="text-sm">df.duplicated()</code> en pandas pour identifier les lignes strictement identiques.</p>
                    </li>
                    <li><strong>Traitement :</strong>
                        <p className="text-slate-500">Supprimer avec <code className="text-sm">df.drop_duplicates()</code>. Attention à bien vérifier s'il s'agit de vrais doublons ou d'erreurs de saisie sur un identifiant par exemple.</p>
                    </li>
                </ul>
            </Card>
        </div>
        <Card title="Combien de pertes accepter ?" icon={<WarningIcon />} className="md:col-span-2">
            <p>Il n'y a pas de règle d'or, cela dépend fortement du cas d'usage et de la taille du dataset.</p>
            <p className="mt-2"><strong>Ordres de grandeur courants :</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>{"< 5% de NA sur une colonne :"}</strong> La suppression des lignes est souvent acceptable. L'imputation est également une bonne option.</li>
                <li><strong>{"5% à 30% de NA :"}</strong> La suppression par ligne devient risquée. L'imputation (moyenne, médiane) est généralement préférée.</li>
                <li><strong>{"> 30-40% de NA :"}</strong> L'imputation devient peu fiable. Il faut sérieusement envisager de supprimer la colonne, surtout si la variable n'est pas cruciale pour l'analyse.</li>
            </ul>
        </Card>
    </div>
);


export const DataTypeContent = () => (
    <>
        <Card title="Qualitatif (Catégoriel)" icon={<CategoricalIcon />}>
            <p>Décrit une qualité ou une caractéristique. Ne peut pas être mesuré numériquement mais peut être observé.</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Nominal :</strong> Étiquettes sans ordre inhérent.
                    <br /><em className="text-slate-500">Ex: "France", "USA", "Homme", "Femme".</em>
                </li>
                <li><strong>Ordinal :</strong> Étiquettes avec un ordre logique.
                    <br /><em className="text-slate-500">Ex: "Petit", "Moyen", "Grand", "Pas d'accord" à "Tout à fait d'accord".</em>
                </li>
            </ul>
        </Card>
        <Card title="Quantitatif (Numérique)" icon={<NumericIcon />}>
            <p>Données mesurables, exprimées en nombres. On peut effectuer des opérations arithmétiques dessus.</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
                <li><strong>Discret :</strong> Nombres entiers, souvent issus d'un comptage.
                    <br /><em className="text-slate-500">Ex: "Nombre d'enfants", "Nombre de voitures vendues".</em>
                </li>
                <li><strong>Continu :</strong> Peut prendre n'importe quelle valeur dans un intervalle.
                    <br /><em className="text-slate-500">Ex: "Taille en cm", "Prix", "Température".</em>
                </li>
            </ul>
        </Card>
    </>
);

export const DescriptiveStatsContent = () => (
    <div className="space-y-8">
        <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center"><CentralTendencyIcon /> Tendance Centrale</h3>
            <div className="grid md:grid-cols-3 gap-6">
                <Card title="Moyenne">
                    <p>Somme des valeurs / Nombre de valeurs.</p>
                    <p className="mt-2 text-center text-sm">
                        Échantillon: <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">x̄ = Σx / n</code><br/>
                        Population: <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">μ = Σx / N</code>
                    </p>
                    <div className="mt-2 p-2 rounded-lg bg-red-50 text-red-700 text-sm">
                        <WarningIcon/> <strong>Sensible</strong> aux valeurs extrêmes (outliers).
                    </div>
                </Card>
                <Card title="Médiane">
                    <p>La valeur du milieu d'un jeu de données trié (50% au-dessus, 50% en dessous).</p>
                    <div className="mt-2 p-2 rounded-lg bg-green-50 text-green-700 text-sm">
                        <LightbulbIcon/> <strong>Robuste</strong> aux valeurs extrêmes.
                    </div>
                </Card>
                <Card title="Mode">
                    <p>La valeur la plus fréquente dans le jeu de données. Utile pour les données catégorielles.</p>
                </Card>
            </div>
        </div>
        <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center"><DispersionIcon /> Dispersion</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                 <Card title="Étendue (Range)">
                    <p>Max - Min. Simple mais très sensible aux extrêmes.</p>
                </Card>
                 <Card title="Quartiles et IQR">
                    <p>Divisent les données ordonnées en 4 parties égales. <strong>Comment les calculer ?</strong></p>
                    <ol className="list-decimal list-inside mt-1 text-sm space-y-1">
                      <li>Triez les données.</li>
                      <li>Trouvez la <strong>médiane (Q2)</strong>.</li>
                      <li><strong>Q1</strong> est la médiane de la moitié inférieure des données.</li>
                      <li><strong>Q3</strong> est la médiane de la moitié supérieure des données.</li>
                    </ol>
                    <p className="mt-2"><strong>IQR (Écart Interquartile) = Q3 - Q1</strong>. C'est l'étendue des 50% de données centrales, très robuste aux outliers.</p>
                </Card>
                <Card title="Variance">
                    <p>Moyenne des carrés des écarts à la moyenne.</p>
                    <p className="mt-2 text-center text-sm">
                      Échantillon: <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">s² = Σ(x-x̄)²/(n-1)</code><br/>
                      Population: <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">σ² = Σ(x-μ)²/N</code>
                    </p>
                </Card>
                <Card title="Écart-type">
                    <p>Racine carrée de la variance. Exprimée dans la même unité que les données.</p>
                    <p className="mt-2 text-center">
                        <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded text-sm">s = √s²</code> ou <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded text-sm">σ = √σ²</code>
                    </p>
                </Card>
            </div>
        </div>
    </div>
);

export const NormalityContent = () => (
    <Card title="La Loi Normale (Courbe de Gauss)" icon={<BellCurveIcon />}>
        <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
                <p>Une distribution symétrique en forme de cloche où la moyenne, la médiane et le mode sont égaux. De nombreux phénomènes naturels suivent cette loi.</p>
                <p className="mt-3 font-semibold">La Règle Empirique (68-95-99.7) :</p>
                <ul className="list-disc list-inside mt-1 text-sm space-y-1">
                    <li>~<strong>68%</strong> des données se situent à ±1 écart-type de la moyenne.</li>
                    <li>~<strong>95%</strong> des données se situent à ±2 écarts-types.</li>
                    <li>~<strong>99.7%</strong> des données se situent à ±3 écarts-types.</li>
                </ul>
            </div>
            <div className="w-full h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={bellCurveData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                        <XAxis dataKey="x" tick={{ fontSize: 10 }} label={{ value: 'Écarts-types (σ)', position: 'insideBottom', offset: -5, fontSize: 12 }} />
                        <YAxis hide />
                        <Tooltip />
                        <Area type="monotone" dataKey="y" stroke="#0ea5e9" fill="#bae6fd" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
        <div className="mt-4 pt-4 border-t">
            <h4 className="font-semibold text-slate-700">Pourquoi est-ce si important ?</h4>
            <ul className="list-disc list-inside mt-2 space-y-2 text-sm">
                <li><strong>Validité des tests statistiques :</strong> De nombreux tests d'hypothèses (T-test, ANOVA) supposent que les données (ou les résidus) suivent une loi normale. Si cette condition n'est pas respectée, leurs résultats peuvent être invalides.</li>
                <li><strong>Théorème Central Limite (TCL) :</strong> Un des théorèmes les plus importants. Il stipule que si vous prenez des échantillons suffisamment grands d'une population (quelle que soit sa distribution), la distribution des moyennes de ces échantillons suivra une loi normale.</li>
                <li><strong>Modèles de Machine Learning :</strong> Certains algorithmes, comme la régression linéaire, fonctionnent mieux lorsque les variables (ou leurs erreurs) sont normalement distribuées.</li>
            </ul>
        </div>
    </Card>
);

export const OtherDistributionsContent = () => (
    <Card title="Lois de probabilité courantes" icon={<DistributionIcon />}>
        <ul className="space-y-4">
            <li>
                <strong className="text-slate-700">Loi Binomiale</strong>
                <p className="text-sm text-slate-600"><strong>Cas d'usage :</strong> Modélise le nombre de succès 'k' dans 'n' essais indépendants, où chaque essai n'a que deux issues (ex: succès/échec, pile/face).<br/>
                <em className="text-slate-500">Ex: Le nombre de clients qui cliquent sur une pub après l'avoir montrée à 100 personnes.</em></p>
            </li>
            <li>
                <strong className="text-slate-700">Loi de Poisson</strong>
                <p className="text-sm text-slate-600"><strong>Cas d'usage :</strong> Modélise le nombre d'événements se produisant dans un intervalle de temps ou d'espace fixe, si ces événements se produisent à un taux moyen connu et indépendamment du temps écoulé depuis le dernier événement.<br/>
                <em className="text-slate-500">Ex: Le nombre d'emails reçus par heure ; le nombre de défauts par mètre carré de tissu.</em></p>
            </li>
            <li>
                <strong className="text-slate-700">Loi Uniforme</strong>
                <p className="text-sm text-slate-600"><strong>Cas d'usage :</strong> Tous les résultats possibles ont la même probabilité d'occurrence.<br/>
                <em className="text-slate-500">Ex: Le lancer d'un dé équilibré (chaque face a 1/6 de chance d'apparaître).</em></p>
            </li>
            <li>
                <strong className="text-slate-700">Loi Log-Normale</strong>
                <p className="text-sm text-slate-600"><strong>Cas d'usage :</strong> Une variable suit une loi log-normale si son logarithme suit une loi normale. Utile pour modéliser des quantités qui sont toujours positives et ont une distribution asymétrique à droite.<br/>
                <em className="text-slate-500">Ex: Les revenus, les prix de l'immobilier, la durée d'une partie d'échecs.</em></p>
            </li>
        </ul>
    </Card>
);

export const CorrelationContent = () => (
  <div className="space-y-6">
    <Card title="Mesurer la Corrélation : Le Coefficient de Pearson (r)">
      <p>Quantifie la force et la direction d'une relation <strong>linéaire</strong> entre deux variables quantitives. Il est compris entre -1 et 1.</p>
      <p className="mt-2"><strong>Formule conceptuelle :</strong></p>
      <p className="mt-1 text-center text-lg"><code className="text-sky-600 font-mono bg-sky-50 p-2 rounded">r = Cov(X,Y) / (σₓ * σᵧ)</code></p>
      <p className="text-sm text-slate-500 mt-1">Où <strong>Cov(X,Y)</strong> est la covariance (mesure de la variation conjointe des deux variables) et <strong>σ</strong> est l'écart-type de chaque variable.</p>
      
      <ul className="list-disc list-inside mt-2 space-y-1">
        <li><strong>Interprétation de r :</strong>
          <ul className="list-['-_'] list-inside ml-4 text-slate-500">
            <li>Si <strong>r se rapproche de +1</strong> : Forte corrélation positive linéaire.</li>
            <li>Si <strong>r se rapproche de -1</strong> : Forte corrélation négative linéaire.</li>
            <li>Si <strong>r se rapproche de 0</strong> : Pas de corrélation linéaire.</li>
          </ul>
        </li>
      </ul>
      <div className="mt-4 p-3 rounded-lg bg-sky-50 text-sky-800 border-l-4 border-sky-500">
          <h4 className="font-bold">Point Clé pour le Machine Learning</h4>
          <p className="text-sm mt-1">La matrice de corrélation est un outil essentiel en phase d'exploration (EDA) :</p>
          <ul className="list-disc list-inside text-sm mt-1">
              <li><strong>Sélection de variables (Feature Selection) :</strong> On cherche des variables fortement corrélées avec la variable cible (<span className="italic">target</span>) car elles ont un bon potentiel prédictif.</li>
              <li><strong>Détection de multicolinéarité :</strong> <WarningIcon /> On se méfie des variables prédictives fortement corrélées *entre elles*. Cela peut rendre les modèles (comme la régression) instables et leurs coefficients difficiles à interpréter.</li>
          </ul>
      </div>
    </Card>
    <Card title="Corrélations Non-Paramétriques">
      <p>Alternatives au coefficient de Pearson lorsque les données ne suivent pas une loi normale ou sont de nature ordinale.</p>
      <ul className="list-disc list-inside mt-2 space-y-2">
        <li>
            <strong className="text-slate-700">Spearman (ρ) :</strong>
            <p className="text-sm text-slate-500">Calcule le coefficient de Pearson sur les <strong>rangs</strong> des données, et non sur les valeurs elles-mêmes. Idéal pour les relations monotones (qui vont toujours dans la même direction, mais pas forcément en ligne droite).</p>
        </li>
        <li>
            <strong className="text-slate-700">Kendall (τ) :</strong>
            <p className="text-sm text-slate-500">Basé sur le nombre de paires concordantes et discordantes. Robuste aux outliers et efficace sur de petits échantillons.</p>
        </li>
      </ul>
    </Card>
    <div className="grid md:grid-cols-2 gap-6">
      <Card title="Exemple : Corrélation Positive (r ≈ 0.9)">
        <p>Quand une variable augmente, l'autre a tendance à augmenter aussi.</p>
        <div className="w-full h-48 mt-4">
          <ResponsiveContainer>
            <ScatterChart>
              <XAxis type="number" dataKey="x" hide />
              <YAxis type="number" dataKey="y" hide />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Positive" data={scatterDataPositive} fill="#0ea5e9" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card title="Exemple : Corrélation Négative (r ≈ -0.9)">
        <p>Quand une variable augmente, l'autre a tendance à diminuer.</p>
        <div className="w-full h-48 mt-4">
          <ResponsiveContainer>
            <ScatterChart>
              <XAxis type="number" dataKey="x" hide />
              <YAxis type="number" dataKey="y" hide />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name="Négative" data={scatterDataNegative} fill="#f43f5e" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  </div>
);

export const HypothesisContent = () => (
    <div className="space-y-6">
        <Card title="Les Fondamentaux">
            <p><strong>Hypothèse Nulle (H0):</strong> L'hypothèse du statu quo, de l'absence d'effet (ex: "la moyenne des deux groupes est la même"). C'est ce qu'on cherche à rejeter.</p>
            <p><strong>Hypothèse Alternative (H1):</strong> Ce que l'on cherche à prouver (ex: "les moyennes sont différentes").</p>
            <p><strong>p-value:</strong> Probabilité d'observer les données actuelles (ou plus extrêmes) si H0 était vraie. Si <code className="text-sm">p-value &lt; α</code> (seuil de significativité, souvent 0.05), on rejette H0.</p>
             <div className="mt-4 pt-4 border-t">
                <h4 className="font-semibold text-slate-700">Les Erreurs à Connaître</h4>
                 <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li><strong>Erreur de Type I (α) :</strong> Rejeter H0 alors qu'elle est vraie (un "faux positif"). La probabilité de cette erreur est le seuil de significativité `α` que l'on fixe.</li>
                    <li><strong>Erreur de Type II (β) :</strong> Ne pas rejeter H0 alors qu'elle est fausse (un "faux négatif").</li>
                </ul>
            </div>
        </Card>
        <Card title="L'Importance de la Taille de l'Échantillon (n)">
            <p>La taille de l'échantillon influence directement la fiabilité de vos conclusions.</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
                <li>
                    <strong className="text-slate-700">Puissance Statistique :</strong>
                    <p className="text-sm text-slate-500">C'est la probabilité de rejeter H0 quand elle est fausse (1-β). Des échantillons plus grands <strong>augmentent la puissance</strong>, ce qui signifie que vous avez plus de chances de détecter un effet réel s'il existe.</p>
                </li>
                <li>
                    <strong className="text-slate-700">Théorème Central Limite (TCL) :</strong>
                    <p className="text-sm text-slate-500">Pour un grand échantillon (souvent <code className="text-sm">n &gt 30</code>), la distribution des moyennes d'échantillons tend vers une loi normale, <strong>même si la distribution de la population d'origine n'est pas normale</strong>. C'est pourquoi les tests paramétriques (comme le T-test) sont considérés comme robustes pour de grands échantillons.</p>
                </li>
            </ul>
        </Card>
        <Card title="Tests Statistiques Courants et leurs Calculs">
            <ul className="space-y-6">
                <li>
                    <strong className="text-slate-700 text-lg">Test T de Student</strong>
                    <p className="text-sm text-slate-600">Compare les moyennes de <strong>deux</strong> groupes.</p>
                    <p className="mt-2 text-center text-sm"><code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">T = (x̄₁ - x̄₂) / SE</code></p>
                    <p className="mt-1 text-xs text-slate-500"><strong>Erreur Standard (SE) :</strong> C'est l'estimation de l'écart-type de la différence entre les deux moyennes d'échantillon. Elle se calcule comme suit : <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">SE = √((s₁²/n₁) + (s₂²/n₂))</code> où 's' est l'écart-type et 'n' la taille de l'échantillon pour chaque groupe.</p>
                    <div className="mt-4 p-3 rounded-lg bg-sky-50 text-sky-800 border-l-4 border-sky-500">
                        <h4 className="font-bold">Point Clé pour le Machine Learning</h4>
                        <p className="text-sm mt-1">Le T-test est le moteur des <strong>A/B tests</strong>. On l'utilise pour déterminer si une nouvelle version (B) d'une page web, d'un produit, ou d'une publicité est statistiquement plus performante (ex: taux de conversion plus élevé) que la version de contrôle (A).</p>
                    </div>
                </li>
                 <li>
                    <strong className="text-slate-700 text-lg">ANOVA (Analyse de la Variance)</strong>
                    <p className="text-sm text-slate-600">Compare les moyennes de <strong>plus de deux</strong> groupes.</p>
                    <p className="mt-2 text-center text-sm"><code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">F = Variance inter-groupes (MSB) / Variance intra-groupes (MSW)</code></p>
                    <p className="mt-1 text-xs text-slate-500"><strong>MSB (Mean Square Between) :</strong> Mesure la variation due à l'appartenance à un groupe. C'est la somme des carrés des écarts entre les moyennes de groupe et la moyenne générale (SSB), divisée par les degrés de liberté. Un MSB élevé signifie que les moyennes des groupes sont très dispersées.</p>
                    <p className="mt-1 text-xs text-slate-500"><strong>MSW (Mean Square Within) :</strong> Mesure la variation aléatoire à l'intérieur de chaque groupe. C'est la somme des carrés des écarts de chaque point à la moyenne de son propre groupe (SSW), divisée par les degrés de liberté. Un F élevé indique que la variation entre les groupes est significativement plus grande que la variation naturelle à l'intérieur des groupes.</p>
                </li>
                <li>
                    <strong className="text-slate-700 text-lg">Test du Chi-carré (χ²) d'indépendance</strong>
                    <p className="text-sm text-slate-600">Teste s'il existe une association entre <strong>deux variables qualitatives</strong>.</p>
                    <p className="mt-2 text-center text-sm"><code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">χ² = Σ [ (Observé - Attendu)² / Attendu ]</code></p>
                    <p className="mt-1 text-xs text-slate-500"><strong>Fréquence Attendue :</strong> Pour chaque cellule d'un tableau de contingence, c'est la fréquence qu'on s'attendrait à avoir si H0 (l'indépendance des variables) était vraie. Elle se calcule ainsi : <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">Attendu = (Total de la Ligne * Total de la Colonne) / Total Général</code>.</p>
                </li>
            </ul>
        </Card>
         <Card title="Autres Tests Essentiels">
            <ul className="space-y-4">
                <li>
                    <strong className="text-slate-700">Test de Normalité (Shapiro-Wilk)</strong>
                    <p className="text-sm text-slate-600"><strong>Objectif :</strong> Vérifier si une variable quantitative suit une distribution normale. C'est un prérequis pour de nombreux tests paramétriques.</p>
                    <p className="text-xs text-slate-500"><strong>H0 :</strong> La distribution est normale.</p>
                     <div className="mt-2 p-2 rounded-lg bg-amber-50 text-amber-700 text-sm">
                        <WarningIcon/> <strong>Attention à la taille de l'échantillon !</strong>
                        <ul className="list-disc list-inside mt-1">
                            <li><strong>Petit échantillon (n &lt; 30) :</strong> Le test manque de puissance. Il peut ne pas détecter une non-normalité réelle.</li>
                            <li><strong>Grand échantillon (n &gt 1000) :</strong> Le test devient trop sensible. Il peut rejeter H0 pour des écarts à la normalité minuscules et sans importance pratique.</li>
                        </ul>
                        <p className="mt-2 font-semibold">Conseil : Toujours coupler ce test avec une inspection visuelle (QQ-Plot, histogramme).</p>
                    </div>
                </li>
                <li>
                    <strong className="text-slate-700">Test de Kolmogorov-Smirnov</strong>
                    <p className="text-sm text-slate-600"><strong>Objectif :</strong> Comparer la distribution d'un échantillon à une distribution de référence (ex: une loi normale), ou comparer les distributions de deux échantillons entre eux.</p>
                     <p className="text-xs text-slate-500"><strong>H0 :</strong> Les deux distributions sont identiques.</p>
                </li>
                <li>
                    <strong className="text-slate-700">Tests non paramétriques</strong>
                    <p className="text-sm text-slate-600">Alternatives aux tests paramétriques quand les conditions (ex: normalité) ne sont pas respectées.</p>
                     <ul className="list-['-_'] list-inside ml-4 text-slate-500 text-sm mt-1">
                        <li><strong>Mann-Whitney U :</strong> Alternative au T-test. Compare les médianes de deux groupes indépendants.</li>
                        <li><strong>Kruskal-Wallis :</strong> Alternative à l'ANOVA. Compare les médianes de plus de deux groupes indépendants.</li>
                    </ul>
                     <div className="mt-2 p-2 rounded-lg bg-green-50 text-green-700 text-sm">
                        <LightbulbIcon/> <strong>Lien avec la taille de l'échantillon :</strong>
                        <p className="mt-1">Ces tests sont une alternative sûre pour les <strong>petits échantillons</strong>, car il est difficile de vérifier la normalité. Pour les <strong>grands échantillons</strong>, grâce au Théorème Central Limite, on peut souvent utiliser les tests paramétriques (T-test, ANOVA) même si les données ne sont pas parfaitement normales.</p>
                    </div>
                </li>
            </ul>
        </Card>
    </div>
);

const BoxPlotDiagram = () => (
  <div className="relative p-4 text-xs text-slate-600 font-sans mt-4 md:mt-0">
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      {/* Whiskers and lines */}
      <line x1="20" y1="40" x2="180" y2="40" stroke="#94a3b8" strokeWidth="1" />
      <line x1="20" y1="30" x2="20" y2="50" stroke="#94a3b8" strokeWidth="1" />
      <line x1="180" y1="30" x2="180" y2="50" stroke="#94a3b8" strokeWidth="1" />
      {/* Box */}
      <rect x="50" y="20" width="100" height="40" fill="#bae6fd" stroke="#0ea5e9" strokeWidth="2" />
      {/* Median line */}
      <line x1="90" y1="20" x2="90" y2="60" stroke="#0284c7" strokeWidth="2" />
      {/* Outlier */}
      <circle cx="195" cy="40" r="3" fill="#f43f5e" />
    </svg>
    {/* Annotations */}
    <div className="absolute top-0" style={{ left: '20px', transform: 'translateX(-50%)' }}>Min</div>
    <div className="absolute top-0" style={{ left: '50px', transform: 'translateX(-50%)' }}>Q1</div>
    <div className="absolute" style={{ top: '65px', left: '90px', transform: 'translateX(-50%)' }}>Médiane (Q2)</div>
    <div className="absolute top-0" style={{ left: '150px', transform: 'translateX(-50%)' }}>Q3</div>
    <div className="absolute top-0" style={{ left: '180px', transform: 'translateX(-50%)' }}>Max</div>
    <div className="absolute" style={{ top: '20px', right: '-15px' }}>Outlier</div>
    <div className="absolute top-0" style={{ left: '100px', transform: 'translateX(-50%)' }}>
      <span className="text-sky-700">IQR</span>
      <svg width="100" height="10" className="absolute" style={{ left: '-50px', top: '15px' }}>
          <path d="M 0 5 L 100 5" stroke="#0284c7" strokeWidth="1" strokeDasharray="2,2" />
          <path d="M 0 0 L 0 10" stroke="#0284c7" strokeWidth="1" />
          <path d="M 100 0 L 100 10" stroke="#0284c7" strokeWidth="1" />
      </svg>
    </div>
  </div>
);

export const GraphChoiceContent = () => (
    <div className="space-y-8">
        <h3 className="text-2xl font-semibold text-slate-800 -mb-2">Pour visualiser une <span className="text-sky-600">Distribution</span></h3>
        <Card title="Histogramme (Histogram)" className="overflow-visible">
            <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                    <p><strong>Quand l'utiliser ?</strong> Pour visualiser la distribution (répartition) d'une seule variable quantitative continue.</p>
                    <p className="mt-2"><strong>Question type :</strong> "Comment se répartissent les âges de nos clients ?"</p>
                </div>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={histogramData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="range" label={{ value: 'Tranches de valeur', position: 'insideBottom', offset: -5 }} />
                            <YAxis label={{ value: 'Fréquence', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Bar dataKey="count" name="Fréquence" fill="#34d399" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
        <Card title="Boîte à moustaches (Box Plot)">
            <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                    <p><strong>Quand l'utiliser ?</strong> Pour résumer la distribution d'une variable quantitative. Il montre la médiane, les quartiles, l'étendue et les valeurs aberrantes (outliers) de manière très concise.</p>
                    <p className="mt-2"><strong>Son point fort :</strong> Idéal pour comparer les distributions de plusieurs groupes côte à côte.</p>
                    <div className="mt-4 p-3 rounded-lg bg-sky-50 text-sky-800 border-l-4 border-sky-500">
                        <h4 className="font-bold">Point Clé pour le Machine Learning</h4>
                        <p className="text-sm mt-1">En EDA (Exploratory Data Analysis), comparer les box plots d'une variable pour chaque classe de la cible est crucial. On cherche une <strong>séparation claire des distributions</strong> :</p>
                        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                            <li>Si les médianes sont très différentes et que les boîtes (IQR) se chevauchent peu entre les classes (par ex. pour le "prix d'achat" des clients qui "résilient" vs. ceux qui "ne résilient pas"), alors la variable a un <strong>fort pouvoir prédictif</strong>.</li>
                            <li>Une grande étendue (IQR) n'est pas utile en soi, mais une <strong>différence d'étendue et de position</strong> entre les groupes l'est. Moins il y a de chevauchement, mieux c'est.</li>
                        </ul>
                    </div>
                </div>
                <BoxPlotDiagram />
            </div>
        </Card>
        <Card title="Quantile-Quantile Plot (QQ-Plot)">
             <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                    <p><strong>Quand l'utiliser ?</strong> Pour comparer la distribution d'une variable quantitative à une distribution théorique (généralement la loi normale).</p>
                    <p className="mt-2"><strong>Comment l'interpréter ?</strong> Si les points suivent de près la ligne diagonale (y=x), alors la distribution de la variable est très similaire à la distribution normale. Des déviations systématiques indiquent un écart par rapport à la normalité.</p>
                </div>
                 <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis type="number" dataKey="theory" name="Quantiles Théoriques" label={{ value: 'Quantiles Théoriques', position: 'insideBottom', offset: -10 }} />
                            <YAxis type="number" dataKey="sample" name="Quantiles Échantillon" label={{ value: 'Quantiles Échantillon', angle: -90, position: 'insideLeft' }} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Données" data={qqPlotData} fill="#0ea5e9" />
                            <ReferenceLine x={0} stroke="#94a3b8" strokeDasharray="3 3" />
                            <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
                             <Line type="monotone" dataKey="theory" stroke="#f43f5e" dot={false} activeDot={false} legendType="none" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>

        <h3 className="text-2xl font-semibold text-slate-800 mt-12 -mb-2">Pour visualiser une <span className="text-sky-600">Relation</span></h3>
        <Card title="Nuage de points (Scatter plot)">
            <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                    <p><strong>Quand l'utiliser ?</strong> Pour visualiser la relation et la corrélation entre deux variables quantitatives.</p>
                    <p className="mt-2"><strong>Question type :</strong> "Y a-t-il un lien entre le budget publicitaire et le chiffre d'affaires ?"</p>
                </div>
                <div className="w-full h-64">
                    <ResponsiveContainer>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <XAxis type="number" dataKey="x" name="Variable X" label={{ value: 'Variable X', position: 'insideBottom', offset: -10 }} />
                            <YAxis type="number" dataKey="y" name="Variable Y" label={{ value: 'Variable Y', angle: -90, position: 'insideLeft' }} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Données" data={scatterDataPositive} fill="#0ea5e9" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
        <Card title="Courbe (Line plot)" className="overflow-visible">
            <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                    <p><strong>Quand l'utiliser ?</strong> Pour montrer l'évolution d'une variable quantitative au fil du temps (ou une autre variable continue).</p>
                    <p className="mt-2"><strong>Question type :</strong> "Comment ont évolué nos ventes mois par mois ?"</p>
                </div>
                <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={lineData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="Ventes 2023" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
        <Card title="Matrice de corrélation (Heatmap)">
          <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                    <p><strong>Quand l'utiliser ?</strong> Pour visualiser l'intensité des corrélations entre plusieurs paires de variables quantitatives en même temps.</p>
                    <p className="mt-2"><strong>Question type :</strong> "Quelles sont les variables les plus fortement liées dans mon jeu de données ?"</p>
                </div>
                <div className="font-mono text-sm p-4 bg-slate-50 rounded">
                    <div className="flex">
                        <div className="w-16">&nbsp;</div>
                        <div className="w-16 text-center font-bold">Var A</div>
                        <div className="w-16 text-center font-bold">Var B</div>
                        <div className="w-16 text-center font-bold">Var C</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-16 font-bold">Var A</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-sky-600 text-white">1.0</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-sky-400">0.8</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-red-200">-0.2</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-16 font-bold">Var B</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-sky-400">0.8</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-sky-600 text-white">1.0</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-red-300">-0.4</div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-16 font-bold">Var C</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-red-200">-0.2</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-red-300">-0.4</div>
                        <div className="w-16 h-16 flex items-center justify-center bg-sky-600 text-white">1.0</div>
                    </div>
                </div>
            </div>
        </Card>
        
        <h3 className="text-2xl font-semibold text-slate-800 mt-12 -mb-2">Pour <span className="text-sky-600">Comparer</span> des catégories</h3>
        <Card title="Diagramme en barres (Bar plot)" className="overflow-visible">
            <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                    <p><strong>Quand l'utiliser ?</strong> Pour comparer une valeur numérique (quantitatif) entre différentes catégories (qualitatif).</p>
                    <p className="mt-2"><strong>Question type :</strong> "Quel pays a réalisé le plus de ventes ?"</p>
                </div>
                <div className="w-full h-64">
                     <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip wrapperClassName="!bg-white !border-slate-200 !rounded-md !shadow-lg" />
                            <Legend />
                            <Bar dataKey="Ventes" fill="#38bdf8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Card>
         <Card title="Diagramme circulaire (Pie Chart)">
            <p><strong>Quand l'utiliser ?</strong> Pour montrer les proportions d'un tout (doit sommer à 100%) pour une variable qualitative.</p>
             <div className="mt-2 p-2 rounded-lg bg-amber-50 text-amber-700 text-sm">
                <WarningIcon/> <strong>À utiliser avec prudence !</strong> Le cerveau humain a du mal à comparer les angles. Si vous avez plus de 4-5 catégories, préférez un diagramme en barres.
            </div>
        </Card>
         <h3 className="text-2xl font-semibold text-slate-800 mt-12 -mb-2">Autres Graphiques Pertinents</h3>
        <Card title="Graphiques complémentaires pour une analyse riche">
            <ul className="space-y-4">
                <li>
                    <strong className="text-slate-700">Violin Plot</strong>
                    <p className="text-sm text-slate-600">Combine un box plot avec une estimation de la densité (KDE) de chaque côté. Il montre non seulement les métriques de résumé, mais aussi la forme complète de la distribution des données. Très utile pour comparer des distributions de manière détaillée.</p>
                </li>
                <li>
                    <strong className="text-slate-700">Stacked Barplot (Barres empilées)</strong>
                    <p className="text-sm text-slate-600">Comme un diagramme en barres, mais chaque barre est segmentée pour montrer la proportion de sous-catégories. Idéal pour comparer la composition interne de plusieurs groupes.</p>
                </li>
                 <li>
                    <strong className="text-slate-700">Pairplot (Matrice de scatterplots)</strong>
                    <p className="text-sm text-slate-600">Crée une grille de graphiques où chaque variable est plotée contre toutes les autres. Les graphiques sur la diagonale sont généralement des histogrammes ou des KDE de chaque variable. C'est un outil puissant pour explorer rapidement les relations par paires dans un dataset.</p>
                </li>
            </ul>
        </Card>
    </div>
);

export const OtherConceptsContent = () => (
  <div className="grid md:grid-cols-2 gap-6">
    <Card title="Détection d'Outliers (Valeurs Aberrantes)">
        <p>Un outlier est un point de donnée qui diffère significativement des autres observations.</p>
        <p className="mt-2"><strong>Méthode de l'IQR (Interquartile Range) :</strong></p>
        <p>Une valeur est souvent considérée comme un outlier si elle est :</p>
        <ul className="list-disc list-inside mt-1 space-y-1 text-sm">
            <li>Supérieure à <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">Q3 + 1.5 * IQR</code></li>
            <li>Inférieure à <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">Q1 - 1.5 * IQR</code></li>
        </ul>
    </Card>
    <Card title="Normalisation et Standardisation">
        <p>Techniques pour mettre les variables numériques sur une échelle commune, crucial pour certains algorithmes de Machine Learning (ex: k-NN, SVM).</p>
        <ul className="mt-2 space-y-2">
            <li><strong>Normalisation (Min-Max):</strong> Met les données sur une échelle de [0, 1].
              <p className="text-center text-sm"><code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">X' = (X - X_min) / (X_max - X_min)</code></p>
            </li>
            <li><strong>Standardisation (Z-score):</strong> Transforme les données pour avoir une moyenne de 0 et un écart-type de 1.
              <p className="text-center text-sm"><code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">Z = (X - μ) / σ</code></p>
            </li>
        </ul>
    </Card>
    <Card title="Modèles de Régression Fondamentaux">
      <div>
        <h4 className="font-bold text-lg text-slate-700">Régression Linéaire</h4>
        <p>Un modèle statistique qui cherche à établir une relation linéaire (une droite) entre une variable dépendante continue (Y) et une ou plusieurs variables indépendantes (X).</p>
        <p className="mt-2">L'équation est <code className="text-sm">Y = aX + b</code>, où l'objectif est de trouver les meilleurs coefficients `a` et `b` qui minimisent l'erreur.</p>
        <div className="mt-2 pt-2 border-t text-sm">
            <p><strong>Calcul de la pente (a) :</strong> <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">a = Σ((xᵢ-x̄)(yᵢ-ȳ)) / Σ((xᵢ-x̄)²)</code></p>
            <p className="mt-2"><strong>Calcul de l'ordonnée à l'origine (b) :</strong> <code className="text-sky-600 font-mono bg-sky-50 p-1 rounded">b = ȳ - a * x̄</code></p>
        </div>
      </div>
      <hr className="my-4"/>
      <div>
        <h4 className="font-bold text-lg text-slate-700">Régression Logistique</h4>
        <p>Utilisée pour les problèmes de <strong>classification</strong>, quand la variable à prédire (Y) est binaire (ex: Oui/Non, 1/0, Client/Prospect).</p>
        <p className="mt-2">Elle ne prédit pas directement la classe, mais la <strong>probabilité</strong> que l'observation appartienne à une classe.</p>
        <p className="mt-2">Le cœur du modèle est la <strong>fonction sigmoïde (ou logistique)</strong> qui transforme un score linéaire en une probabilité entre 0 et 1 :</p>
        <p className="text-center text-lg mt-2"><code className="text-sky-600 font-mono bg-sky-50 p-2 rounded">p = 1 / (1 + e⁻ᶻ)</code></p>
        <p className="text-sm text-slate-500 mt-1">où <code className="text-sm">z = aX + b</code>. On applique ensuite un seuil (ex: si p &gt 0.5, alors classe = 1) pour obtenir la prédiction finale.</p>
      </div>
    </Card>
     <Card title="Échantillonnage (Sampling)">
      <p>Le processus de sélection d'un sous-ensemble (échantillon) d'une population plus large pour en tirer des conclusions.</p>
      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
          <li><strong>Aléatoire simple :</strong> Chaque individu a une chance égale d'être choisi.</li>
          <li><strong>Stratifié :</strong> La population est divisée en sous-groupes (strates) et un échantillon aléatoire est tiré de chaque strate. Assure la représentation des sous-groupes.</li>
      </ul>
    </Card>
  </div>
);

export const EDAContent = () => (
    <div className="space-y-6">
        <Card title="Tests Statistiques pour la Sélection de Features" icon={<BrainIcon />}>
            <p>Les tests comme le <strong>t-test</strong> ou l'<strong>ANOVA</strong> sont utilisés pour déterminer si des features sont <strong>discriminantes</strong>, c'est-à-dire si leurs distributions diffèrent significativement entre les classes de la variable cible.</p>
            <p className="mt-2 text-slate-500">Si la p-value d'un test est faible (&lt; 0.05), la feature est considérée comme potentiellement utile pour la prédiction. Les <strong>boxplots</strong> sont la visualisation parfaite pour confirmer visuellement ce résultat.</p>
        </Card>

        <Card title="Analyse des Distributions et Transformations" icon={<BrainIcon />}>
             <p>Examiner les distributions est crucial pour détecter l'asymétrie (skewness) ou le manque de normalité, qui peuvent affecter les performances de certains modèles ML (notamment les modèles linéaires).</p>
             <p className="mt-2 text-slate-500">Si une distribution est très asymétrique (ex: revenus), on peut appliquer des <strong>transformations</strong> (log, racine carrée, Box-Cox) pour la rendre plus symétrique.</p>
             <div className="mt-3">
                <strong>Outils :</strong> Histogrammes, QQ-plots, et tests de normalité (Shapiro-Wilk).
            </div>
        </Card>

        <Card title="Analyse des Relations pour le choix du Modèle" icon={<BrainIcon />}>
            <p>L'EDA guide le choix entre différents types de modèles.</p>
            <ul className="list-disc list-inside mt-2 space-y-2">
                <li>
                    <strong>Pour une Régression Linéaire (cible continue) :</strong>
                    <p className="text-sm text-slate-500">On vérifie la <strong>linéarité</strong> via des scatterplots entre chaque feature et la cible. On recherche aussi des corrélations fortes avec la heatmap.</p>
                </li>
                 <li>
                    <strong>Pour une Régression Logistique (cible catégorielle) :</strong>
                    <p className="text-sm text-slate-500">On explore la <strong>séparabilité des classes</strong>. Des boxplots ou des scatterplots colorés par classe permettent de voir si une feature sépare bien les groupes.</p>
                </li>
            </ul>
        </Card>
        
        <Card title="Pièges à Éviter et Bonnes Pratiques" icon={<WarningIcon />}>
            <ul className="list-disc list-inside space-y-3">
                <li>
                    <strong>Multicolinéarité :</strong> Utiliser une heatmap de corrélation pour détecter les corrélations élevées <strong>entre les features prédictives</strong>. Une forte multicolinéarité peut déstabiliser les coefficients des modèles linéaires.
                </li>
                <li>
                    <strong>Gestion des Outliers :</strong> Les identifier avec des boxplots. Leur traitement (suppression, winsorisation) est important car ils peuvent biaiser les algorithmes sensibles comme la régression linéaire.
                </li>
                <li>
                    <strong>Feature Engineering :</strong> L'EDA est la principale source d'inspiration pour la création de nouvelles variables (features). L'exploration des interactions entre variables est clé.
                </li>
            </ul>
        </Card>
    </div>
);
