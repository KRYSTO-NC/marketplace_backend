# RFID NC Marketplace - Backend

- [English Version](#english-version)
- [Version Française](#version-française)

## English Version

### Description

This project is the backend for the RFID NC Marketplace. It provides an API for the marketplace, built with Express and Mongoose.

### Features

- **Express**: The fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: Elegant MongoDB object modeling for Node.js.
- **Custom Middlewares**: 
  - **Advanced Results**: For pagination, filtering, and sorting results.
  - **Async Handler**: Error handler for asynchronous functions.
  - **Auth**: Handles authentication and authorization.
  - **Error Handler**: Centralized error handling.
- **Security**: Implements security best practices.
- **File Upload**: Supports file uploading.
- **Logging**: Uses `morgan` for logging.
- **CORS**: Cross-Origin Resource Sharing enabled.
- **GeoCoder**: Used for geocoding and geolocation.

### Setting Up

#### Scripts

```
To run the development server:
npm run dev
For production:
npm start
```

#### Environment Variables

```
Set up your `.env` file:

NODE_ENV=development
PORT=8000
FRONT_URL=http://localhost:3000/
MONGO_URI=<Your_MongoDB_URI>
... (And other necessary environment variables.)
```

### Database Seeding


For initial data:
```
node seeder -i
```

To delete all data:
```
node seeder -d
```

### Postman Workspace

[Test the endpoints with Postman](https://red-shadow-828686.postman.co/workspace/7c5e4383-9de5-4e98-9058-c1ac9ed83a1a)

### Contributions

Pull requests are welcome.

---

## Version Française

### Description

Ce projet est le backend du Marketplace RFID NC. Il fournit une API pour le marché, construite avec Express et Mongoose.

### Fonctionnalités

- **Express**: Le framework web rapide, non opinionné et minimaliste pour Node.js.
- **Mongoose**: Modélisation élégante des objets MongoDB pour Node.js.
- **Middlewares Personnalisés**: 
  - **Advanced Results**: Pour la pagination, le filtrage et le tri des résultats.
  - **Async Handler**: Gestionnaire d'erreurs pour les fonctions asynchrones.
  - **Auth**: Authentification et autorisation.
  - **Error Handler**: Gestion centralisée des erreurs.
- **Sécurité**: Implémente les meilleures pratiques de sécurité.
- **Téléchargement de Fichiers**: Prise en charge du téléchargement de fichiers.
- **Journalisation**: Utilise `morgan` pour la journalisation.
- **CORS**: Partage de ressources cross-origin activé.
- **GeoCoder**: Utilisé pour le géocodage et la géolocalisation.

### Configuration

#### Scripts

--INSERT BACKTICKS HERE--
Pour démarrer le serveur de développement:
npm run dev
Pour la production:
npm start
--INSERT BACKTICKS HERE--

#### Variables d'Environnement

```
Configurez votre fichier `.env`:

NODE_ENV=development
PORT=8000
FRONT_URL=http://localhost:3000/
MONGO_URI=<Votre_MongoDB_URI>
... (Et les autres variables d'environnement nécessaires.)
```

### Seeding de la Base de Données

Pour les données initiales:
```
node seeder -i
```
Pour supprimer toutes les données:
```
node seeder -d
```

### Workspace Postman

[Testez les endpoints avec Postman](https://red-shadow-828686.postman.co/workspace/7c5e4383-9de5-4e98-9058-c1ac9ed83a1a)

### Contributions

Les Pull Requests sont les bienvenus.
