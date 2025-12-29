import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RgpdSection {
  id: number;
  title: string;
  content: string;
}

@Component({
  selector: 'app-rgpd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rgpd.component.html',
  styleUrl: './rgpd.component.css'
})
export class RgpdComponent {
  selectedSectionId: number = 1;

  sections: RgpdSection[] = [
    {
      id: 1,
      title: "1. Responsable du traitement",
      content: `
        <h3>1. Responsable du traitement des données</h3>
        <p>Le responsable du traitement des données personnelles est :</p>
        <p><strong>Oishi SARL</strong></p>
        <ul>
          <li>Adresse : 17 Rue Jablinot, 77910 Meaux, France</li>
          <li>E-mail : <a href="mailto:privacy&#64;oishi.fr">privacy&#64;oishi.fr</a> (contact réservé aux demandes liées au RGPD)</li>
          <li>Représentant légal : Le Gérant de la société Oishi</li>
          <li>Site internet : www.oishi.com</li>
          <li>Hébergeur du site : OVHcloud</li>
        </ul>
        <p>Oishi déclare assurer la protection, la confidentialité et la sécurité des données personnelles traitées dans le cadre de son activité de commande en ligne de repas livrés.</p>
      `
    },
    {
      id: 2,
      title: "2. Données collectées",
      content: `
        <h3>2. Données personnelles collectées</h3>
        <p>Dans le cadre de l'utilisation du site www.oishi.fr et des services proposés (commande en ligne et formulaire de contact), Oishi est susceptible de collecter les données personnelles suivantes :</p>
        
        <h4>2.1 Données collectées lors d'une commande en ligne</h4>
        <ul>
          <li>Nom et prénom</li>
          <li>Adresse de livraison</li>
          <li>Adresse e-mail</li>
          <li>Numéro de téléphone</li>
          <li>Détails de commande</li>
          <li>Historique de commandes</li>
          <li>Mode de paiement (via Stripe - aucune donnée bancaire n'est stockée par Oishi)</li>
        </ul>

        <h4>2.2 Données collectées via le formulaire de contact</h4>
        <ul>
          <li>Nom</li>
          <li>Adresse e-mail</li>
          <li>Objet et contenu du message</li>
        </ul>

        <h4>2.3 Données collectées automatiquement (cookies et outils de mesure)</h4>
        <ul>
          <li>Adresse IP partielle (anonymisée)</li>
          <li>Données de navigation (Pages consultées)</li>
          <li>Outil utilisé : Google Analytics</li>
        </ul>

        <h4>2.4 Données liées à la sécurité et à la prévention des fraudes</h4>
        <ul>
          <li>Contrôle technique automatique pour prévenir les fraudes bancaires lors des paiements via Stripe</li>
          <li>Adresse IP en cas d'activité suspecte</li>
        </ul>

        <h4>2.5 Principe de minimisation</h4>
        <p>Oishi s'engage à ne collecter uniquement les données nécessaires au traitement des commandes, à la facturation, au suivi client et à des fins statistiques internes.</p>
      `
    },
    {
      id: 3,
      title: "3. Finalités et Base Légale",
      content: `
        <h3>3. Finalités du traitement et base légale (Article 6 RGPD)</h3>
        <p>Les données collectées par Oishi sont utilisées dans les finalités suivantes :</p>
        <table class="rgpd-table">
          <thead>
            <tr><th>Finalité du traitement</th><th>Base légale (Article 6 RGPD)</th></tr>
          </thead>
          <tbody>
            <tr><td>Traitement de vos commandes</td><td>Exécution d'un contrat</td></tr>
            <tr><td>Paiement et facturation</td><td>Obligation légale</td></tr>
            <tr><td>Livraison à domicile</td><td>Exécution d'un contrat</td></tr>
            <tr><td>Lutte contre la fraude bancaire</td><td>Intérêt légitime</td></tr>
            <tr><td>Réponse aux demandes via formulaire de contact</td><td>Intérêt légitime</td></tr>
            <tr><td>Envoi d'e-mails liés à une commande</td><td>Exécution d'un contrat</td></tr>
            <tr><td>Amélioration du service client</td><td>Intérêt légitime</td></tr>
            <tr><td>Statistiques de fréquentation (Google Analytics)</td><td>Consentement</td></tr>
            <tr><td>Gestion des réclamations</td><td>Intérêt légitime</td></tr>
            <tr><td>Conservation des factures et obligations comptables</td><td>Obligation légale</td></tr>
          </tbody>
        </table>
        <p>Oishi ne revend pas et ne commercialise jamais vos données personnelles.</p>
      `
    },
    {
      id: 4,
      title: "4. Destinataires",
      content: `
        <h3>4. Destinataires des données et sous-traitants</h3>
        <p>Vos données personnelles sont exclusivement destinées à Oishi et aux prestataires nécessaires au fonctionnement de ses services. Elles ne sont jamais vendues à des tiers.</p>
        
        <h4>4.1 Sous-traitants autorisés</h4>
        <p>Oishi peut transmettre certaines données à des prestataires de confiance pour assurer le service :</p>
        <table class="rgpd-table">
          <thead><tr><th>Prestataire</th><th>Rôle</th><th>Localisation</th><th>Conformité RGPD</th></tr></thead>
          <tbody>
            <tr><td>Stripe Payments Europe</td><td>Paiement en ligne et sécurité anti-fraude</td><td>UE (Irlande)</td><td>Certification PCI-DSS - RGPD conforme</td></tr>
            <tr><td>Google Analytics</td><td>Analyse statistique de fréquentation</td><td>États-Unis (transferts UE encadrés)</td><td>Clauses Contractuelles Types</td></tr>
            <tr><td>OVHcloud</td><td>Hébergement du site</td><td>UE</td><td>Conforme RGPD</td></tr>
            <tr><td>Prestataire de livraison</td><td>Livraison des commandes</td><td>France</td><td>Données limitées (nom/adresse/tél)</td></tr>
          </tbody>
        </table>

        <h4>4.2 Transfert hors Union Européenne</h4>
        <p>Certains sous-traitants (ex: Google Analytics) peuvent transférer des données hors UE. Ces transferts sont encadrés légalement via Clauses Contractuelles Types (CCT) conformément à la réglementation européenne.</p>
      `
    },
    {
      id: 5,
      title: "5. Cookies",
      content: `
        <h3>5. Cookies et traceurs</h3>
        <p>Lors de votre navigation sur www.oishi.fr, des cookies peuvent être déposés sur votre terminal. Ces traceurs sont utilisés uniquement pour le bon fonctionnement du site, la gestion du panier et la mesure d'audience avec votre consentement.</p>
        
        <h4>5.1 Types de cookies utilisés</h4>
        <table class="rgpd-table">
          <thead><tr><th>Type de cookie</th><th>Finalité</th><th>Base légale</th><th>Durée</th></tr></thead>
          <tbody>
            <tr><td>Cookies de préférence</td><td>Fonctionnement du site et panier, sauvegarde de vos choix</td><td>Intérêt légitime</td><td>Session / 6 mois</td></tr>
            <tr><td>Cookies de mesure d'audience</td><td>Statistiques anonymisées (Google Analytics)</td><td>Consentement</td><td>13 mois</td></tr>
            <tr><td>Cookies publicitaires</td><td>Aucun utilisé par Oishi</td><td>-</td><td>-</td></tr>
          </tbody>
        </table>

        <h4>5.2 Outil de gestion des cookies</h4>
        <p>Lors de votre première visite, une bannière cookies conforme CNIL vous permet d'accepter, de refuser ou de personnaliser votre choix. Aucun cookie non essentiel n'est déposé sans votre consentement.</p>

        <h4>5.3 Comment gérer ou supprimer les cookies ?</h4>
        <p>Vous pouvez modifier votre choix à tout moment via votre navigateur ou via la page « Politique Cookies ».</p>
      `
    },
    {
      id: 6,
      title: "6. Sécurité",
      content: `
        <h3>6. Sécurité et protection des données</h3>
        <p>Oishi met en place l'ensemble des mesures techniques et organisationnelles nécessaires pour assurer la sécurité et la confidentialité des données personnelles.</p>
        
        <h4>6.1 Mesures générales de protection</h4>
        <ul>
          <li>Chiffrement HTTPS des communications</li>
          <li>Pare-feu serveur et surveillance de sécurité</li>
          <li>Sauvegardes régulières</li>
          <li>Accès restreint aux données (personnel autorisé uniquement)</li>
        </ul>

        <h4>6.2 Paiements sécurisés</h4>
        <p>Les paiements sont sécurisés via Stripe, prestataire certifié PCI-DSS Niveau 1, le plus haut niveau international de sécurité bancaire. Oishi ne conserve jamais vos numéros de carte bancaire.</p>

        <h4>6.3 Lutte contre la fraude</h4>
        <p>Pour prévenir les paiements frauduleux et protéger les utilisateurs :</p>
        <ul>
          <li>Vérification sécurisée du paiement</li>
          <li>Contrôles automatisés anti-fraude via Stripe Radar</li>
          <li>Analyse d'adresses IP en cas d'activité suspecte</li>
        </ul>
      `
    },
    {
      id: 7,
      title: "7. Conservation",
      content: `
        <h3>7. Durée de conservation des données</h3>
        <p>Oishi conserve les données personnelles uniquement pour la durée strictement nécessaire aux finalités pour lesquelles elles ont été collectées, conformément aux recommandations de la CNIL.</p>
        <table class="rgpd-table">
          <thead><tr><th>Type de données</th><th>Durée de conservation</th><th>Base légale</th></tr></thead>
          <tbody>
            <tr><td>Données de commande</td><td>3 ans après dernière interaction</td><td>Intérêt légitime</td></tr>
            <tr><td>Factures liées aux commandes</td><td>10 ans</td><td>Obligation légale (Code du commerce)</td></tr>
            <tr><td>Données de paiement</td><td>Non conservées par Oishi</td><td>PCI-DSS (Stripe)</td></tr>
            <tr><td>Historique de navigation (cookies)</td><td>6 à 13 mois</td><td>CNIL</td></tr>
            <tr><td>Données du formulaire de contact</td><td>12 mois</td><td>Suivi relation client</td></tr>
            <tr><td>Données liées à la lutte anti-fraude</td><td>6 mois</td><td>Intérêt légitime</td></tr>
            <tr><td>Emails marketing (newsletter)</td><td>Jusqu'au désabonnement</td><td>Consentement utilisateur</td></tr>
          </tbody>
        </table>
      `
    },
    {
      id: 8,
      title: "8. Vos Droits",
      content: `
        <h3>8. Droits des utilisateurs (RGPD)</h3>
        <p>Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants concernant vos données personnelles :</p>
        <table class="rgpd-table">
          <thead><tr><th>Droit</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td>Droit d'accès</td><td>Vous pouvez demander à consulter les données que nous possédons sur vous</td></tr>
            <tr><td>Droit de rectification</td><td>Vous pouvez corriger ou compléter vos données</td></tr>
            <tr><td>Droit de suppression</td><td>Vous pouvez demander l'effacement de vos données (sauf obligations légales)</td></tr>
            <tr><td>Droit d'opposition</td><td>Vous pouvez refuser l'utilisation de vos données pour certaines finalités</td></tr>
            <tr><td>Droit à la limitation</td><td>Vous pouvez demander la suspension temporaire de traitement</td></tr>
            <tr><td>Droit à la portabilité</td><td>Vous pouvez recevoir vos données dans un format lisible</td></tr>
            <tr><td>Droit de retirer votre consentement</td><td>Valable pour cookies ou emails marketing</td></tr>
            <tr><td>Droit d'introduire une réclamation</td><td>Auprès de la CNIL si vos droits ne sont pas respectés</td></tr>
          </tbody>
        </table>
        
        <h4>8.1 Exercice des droits</h4>
        <p>Toute demande relative à l'exercice de vos droits doit être adressée uniquement par e-mail : <a href="mailto:privacy&#64;oishi.fr">privacy&#64;oishi.fr</a></p>
        <p>Objet obligatoire : Demande RGPD - Oishi. Les demandes seront traitées sous 30 jours maximum.</p>
      `
    },
    {
      id: 9,
      title: "9. Hébergement",
      content: `
        <h3>9. Hébergement du site et transferts hors UE</h3>
        <p>Le site www.oishi.fr est hébergé par un prestataire OVHcloud. Cette mention sera mise à jour et complétée dès désignation de l'hébergeur conformément à l'article 13 du RGPD.</p>
        
        <h4>9.1 Localisation des données</h4>
        <p>Les données collectées et traitées par Oishi sont stockées au sein de l'Union européenne ou dans des pays offrant un niveau de protection adéquat conformément à la réglementation européenne.</p>

        <h4>9.2 Transferts hors UE</h4>
        <p>Certains fournisseurs techniques employés par Oishi, tels que Google Analytics, peuvent effectuer des transferts encadrés hors de l'Union Européenne. Ces transferts respectent les garanties prévues par le RGPD (Clauses Contractuelles Types, Encadrement juridique supplémentaire). Aucun transfert illégal n'est effectué.</p>
      `
    },
    {
      id: 10,
      title: "10. Responsabilité",
      content: `
        <h3>10. Responsabilité et limites techniques</h3>
        <p>Oishi met tout en œuvre pour assurer la sécurité et la confidentialité des données collectées. Toutefois, l'utilisateur reconnaît que toute transmission d'informations sur Internet comporte des risques inhérents.</p>
        <p>Oishi ne peut garantir une sécurité absolue des données transitant via son site en cas de force majeure, cyberattaque massive ou incident imprévisible.</p>
        <p>Oishi ne pourra être tenue responsable des dommages résultants :</p>
        <ul>
          <li>d'une utilisation inappropriée du site,</li>
          <li>d'une faute ou négligence de l'utilisateur,</li>
          <li>d'un incident lié à un tiers (exemple: défaillance réseau, prestataire externe),</li>
          <li>d'un cas de force majeure au sens de la loi.</li>
        </ul>
        <p>En utilisant ce site, l'utilisateur accepte ces limitations dans le cadre légal autorisé.</p>
      `
    },
    {
      id: 11,
      title: "11. Anti-fraude",
      content: `
        <h3>11. Lutte contre l'abus, fraude et contenus illicites</h3>
        <p>Dans le cadre de la sécurité de son site et de la protection de ses utilisateurs, Oishi se réserve le droit de :</p>
        <ul>
          <li>Vérifier l'authenticité des informations fournies lors d'une commande.</li>
          <li>Refuser une commande en cas de suspicion d'abus, de fraude, d'usurpation d'identité ou d'utilisation malveillante du site.</li>
          <li>Bloquer temporairement l'accès à un utilisateur en cas d'activité suspecte.</li>
          <li>Conserver certaines données techniques (exemple: adresse IP) à des fins probatoires en cas de fraude.</li>
          <li>Coopérer avec les autorités judiciaires en cas d'enquête liée à des activités illégales.</li>
        </ul>
        <p>Aucune utilisation abusive du service ne sera tolérée.</p>
      `
    },
    {
      id: 12,
      title: "12. Base légale",
      content: `
        <h3>12. Base juridique complémentaire (Article 6 RGPD)</h3>
        <p>Les traitements de données personnelles réalisés par Oishi reposent exclusivement sur l'une des bases légales prévues à l'article 6 du RGPD :</p>
        <ul>
          <li><strong>Exécution d'un contrat :</strong> traitement des commandes, suivi livraison, facturation.</li>
          <li><strong>Obligation légale :</strong> conservation des documents comptables.</li>
          <li><strong>Intérêt légitime :</strong> prévention de la fraude, sécurité des paiements.</li>
          <li><strong>Consentement :</strong> collecte des cookies non essentiels (Google Analytics).</li>
          <li><strong>Protection des droits légaux :</strong> en cas de litige ou réclamation client.</li>
        </ul>
        <p>Aucun traitement automatisé ni profilage commercial ne sont effectués par Oishi.</p>
      `
    },
    {
      id: 13,
      title: "13. Modifications",
      content: `
        <h3>13. Modifications de la politique de confidentialité</h3>
        <p>La présente politique de confidentialité peut être modifiée ou mise à jour à tout moment, notamment pour se conformer aux évolutions légales, techniques ou de service.</p>
        <p>En cas de modification importante, Oishi s'engage à :</p>
        <ul>
          <li>Informer les utilisateurs via le site www.oishi.fr</li>
          <li>Mettre à jour la date de dernière révision</li>
          <li>Conserver les versions antérieures sur demande</li>
        </ul>
      `
    },
    {
      id: 14,
      title: "14. CNIL",
      content: `
        <h3>14. Réclamation auprès de l'autorité de contrôle (CNIL)</h3>
        <p>Si vous estimez, après avoir contacté Oishi, que vos droits relatifs à vos données personnelles ne sont pas respectés ou que le traitement n'est pas conforme aux règles de protection des données, vous avez le droit d'introduire une réclamation auprès de l'autorité de contrôle compétente :</p>
        <p><strong>CNIL - Commission Nationale de l'Informatique et des Libertés</strong><br>
        Adresse postale : 3 Place de Fontenoy - TSA 80715 - 75334 Paris Cedex 07<br>
        Site officiel : <a href="https://www.cnil.fr" target="_blank">www.cnil.fr</a></p>
      `
    },
    {
      id: 15,
      title: "15. Contact",
      content: `
        <h3>15. Contact</h3>
        <p>Pour toute question relative à la présente politique de confidentialité ou à l'exercice de vos droits, vous pouvez contacter Oishi via l'adresse suivante :</p>
        <ul>
          <li><strong>E-mail dédié aux demandes RGPD :</strong> <a href="mailto:privacy&#64;oishi.fr">privacy&#64;oishi.fr</a></li>
          <li><strong>Objet du message :</strong> Demande RGPD - Oishi</li>
        </ul>
        <p>Oishi traite exclusivement les demandes par e-mail afin de garantir la traçabilité et la sécurité juridique.</p>
      `
    },
    {
      id: 16,
      title: "16. Mise à jour",
      content: `
        <h3>16. Dernière mise à jour</h3>
        <p>La présente politique de confidentialité est entrée en vigueur le <strong>23 octobre 2025</strong>. Elle remplace toute version antérieure et sera tenue à jour conformément aux exigences légales.</p>
      `
    }
  ];

  selectSection(id: number): void {
    this.selectedSectionId = id;
    const content = document.querySelector('.content-panel');
    if (content) content.scrollTop = 0;
  }

  get currentContent(): string {
    return this.sections.find(s => s.id === this.selectedSectionId)?.content || '';
  }
}