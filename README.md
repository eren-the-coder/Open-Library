# 📚 OpenLibrary

OpenLibrary est une application web qui permet de gérer une bibliothèque en ligne pour étudiants.  
Le projet est divisé en deux parties :

- **Backend (PHP/MySQL)** — gère les données et l'API.
- **Frontend (React ou autre framework)** — gère l'interface utilisateur.

---

## ⚙️ Prérequis

Avant d'exécuter le projet, assurez-vous d'avoir :

- **XAMPP** (ou WAMP/LAMP) installé
- **PHP 8+**
- **MySQL/MariaDB**
- **Node.js + npm** ou **yarn**
- **Git** (optionnel, mais recommandé)

---

## 🧠 Fonctionnement général

1. Le **backend PHP** communique avec la **base de données MySQL**.
2. Le **frontend** interagit avec le backend via des **requêtes HTTP** (`fetch`).
3. L'utilisateur peut télécharger et ajouter des ressources.

---

## 🖼️ Aperçu du projet

Voici un aperçu visuel de **OpenLibrary** sur différents appareils :

<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;">

<div style="flex: 1 1 250px; max-width: 300px; text-align: center;">
<img src="./frontend/previews/desktop.png" alt="Preview Desktop" style="width: 100%; border-radius: 10px;">
<p>💻 <b>Desktop</b></p>
</div>

<div style="flex: 1 1 250px; max-width: 300px; text-align: center;">
<img src="./frontend/previews/tablet.png" alt="Preview Tablet" style="width: 100%; border-radius: 10px;">
<p>📗 <b>Tablette</b></p>
</div>

<div style="flex: 1 1 250px; max-width: 300px; text-align: center;">
<img src="./frontend/previews/mobile.png" alt="Preview Mobile" style="width: 100%; border-radius: 10px;">
<p>📱 <b>Mobile</b></p>
</div>

</div>

---

## 🖥️ Installation et exécution

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/eren-the-coder/uy1_open_library.git
cd uy1_open_library
```

---

### 2️⃣ Configuration du backend

#### ➤ Étape 1 : Créer le lien symbolique vers `htdocs`

**Sous Linux :**

```bash
sudo ln -s /chemin/vers/openlibrary/backend /opt/lampp/htdocs/openlibrary
```

**Sous Windows :**

- Copiez le dossier `backend/` dans `C:\xampp\htdocs\openlibrary`

#### ➤ Étape 2 : Configuration de la base de données

1. Démarrez **Apache** et **MySQL** via le panneau de contrôle XAMPP

   **Sous Windows :**  
   Ouvrez le **panneau de contrôle XAMPP**, puis cliquez sur **Start** à côté de **Apache** et **MySQL**.

   **Sous Linux :**

   ```bash
   # Si XAMPP est installé dans /opt/lampp
   sudo /opt/lampp/lampp start
   ```

   Pour vérifier que tout fonctionne :

   ```bash
   sudo /opt/lampp/lampp status
   ```

   Tu devrais voir :

   ```
   Apache is running.
   MySQL is running.
   ```

   Pour arrêter les services :

   ```bash
   sudo /opt/lampp/lampp stop
   ```

2. Ouvrez [phpMyAdmin](http://localhost/phpmyadmin).

3. Importez le fichier : `database/openlibrary.sql`

4. Dans `backend/api/config.php`, configurez vos identifiants de connexion :

   ```php
   <?php
   $host = "localhost";
   $user = "root";
   $pass = "";
   $dbname = "openlibrary";
   ?>
   ```

#### ➤ Étape 3 : Tester le backend

Ouvrez [http://localhost/openlibrary](http://localhost/openlibrary) ou directement un endpoint API, par exemple :

```
http://localhost/openlibrary/api/getPosts.php
```

---

### 3️⃣ Configuration du frontend

Tapez les commandes suivantes pour démarrer le serveur de développement du **frontend React** :

```bash
cd frontend
npm install
npm run dev
```

Le projet devrait se lancer sur :  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🌍 Configuration de l'environnement de production

Avant de mettre votre application en ligne, créez un fichier **`.env.production`** à la racine du dossier **frontend/**.

Ce fichier doit contenir l'URL de votre API hébergée :

```bash
# Distant API URL
VITE_API_URL=https://ton-site.com/api
```

> ⚙️ Ce fichier est utilisé automatiquement lors du build de production (`npm run build`) pour connecter l'application à l'API distante.

---

## 🌐 Déploiement sur un hébergeur

1. **Construisez votre frontend React pour la production :**

   ```bash
   cd frontend
   npm run build
   ```

2. **Intégrez le backend PHP dans le dossier de production :**

   ```bash
   cp -r ../backend/* ./dist/
   ```

   **Structure finale :**

   ```
   dist/
   ├── api/
   ├── index.html
   ├── assets/
   ├── favicon.ico
   ├── .htaccess
   └── ...
   ```

3. **Configurez la base de données distante :**

   - Importez `openlibrary.sql` sur votre base distante
   - Modifiez les identifiants dans `dist/api/.env.php`

4. **Ajoutez un fichier `.htaccess` dans `dist/`**

   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^ index.html [L]

   <FilesMatch "\.(env|sql|log|ini|sh|bat)$">
     Order allow,deny
     Deny from all
   </FilesMatch>

   RewriteRule ^includes/ - [F,L]
   ```

5. **Uploadez le dossier `dist/` sur votre hébergeur.**

6. **Accédez à votre site en ligne :**

   ```
   https://ton-site.com
   ```

---

## 🔐 Gestion des fichiers `.env` et `config.php`

### 📄 1️⃣ Fichier `.env.php` (non versionné)

Contient les variables sensibles de ton backend : identifiants de base de données, URLs et mode d'environnement.

📍 **Emplacement :**

```
backend/api/.env.php
```

🧱 **Exemple :**

```php
<?php
return [
  'host' => 'localhost',
  'user' => 'root',
  'pass' => '',
  'dbname' => 'openlibrary',
  'mode' => 'dev',
  'baseUrl_dev' => 'http://localhost/openlibrary/uploads/',
  'baseUrl_prod' => 'https://ton-site.com/uploads/',
];
```

⚠️ **Important :**  
Ajoute cette ligne dans ton `.gitignore` :

```
backend/api/.env.php
```

---

### ⚙️ 2️⃣ Fichier `config.php`

Charge les données du `.env.php` et initialise la connexion MySQL.

```php
<?php
$env = include __DIR__ . '/.env.php';

$conn = new mysqli(
  $env['host'],
  $env['user'],
  $env['pass'],
  $env['dbname']
);

if ($conn->connect_error) {
    die(json_encode([
        "success" => false,
        "message" => "Erreur de connexion à la base de données"
    ]));
}
?>
```

---

### 🧭 3️⃣ Gestion automatique du mode `dev` / `prod`

```php
$host = $_SERVER['HTTP_HOST'];
if ($host === '127.0.0.1' || $host === 'localhost') {
  $baseUrl = $env['baseUrl_dev'];
} else {
  $baseUrl = $env['baseUrl_prod'];
}
```

---

## 🧰 Structure de l'API

Chaque fichier dans `backend/api/` représente une route :

- `getPosts.php` → renvoie la liste des ressources
- `addPost.php` → ajoute un livre (POST)
- `getTeachingUnit.php` → renvoie la liste des unités d'enseignement
- `download.php` → télécharge une ressource

---

## 👨‍💻 Auteur

**Projet OpenLibrary**  
Développé par _Eren MM_

---

## ⚖️ Licence

Ce projet est libre sous licence MIT.  
Vous pouvez l'utiliser, le modifier et le redistribuer librement, à condition de conserver les mentions d'origine.

---

💡 _Merci d'utiliser OpenLibrary — un projet conçu pour rendre le savoir accessible à tous !_
