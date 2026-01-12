# API Réservations - Documentation

## Endpoints

### 1. Créer une réservation (Public)
**POST** `/api/reservations`

**Body:**
```json
{
  "nom": "Dupont Jean",
  "email": "jean@example.com",
  "telephone": "+33612345678",
  "typeService": "Massage relaxant",
  "date": "2024-01-15",
  "heure": "14:00",
  "message": "Message optionnel"
}
```

**Réponse:** 201 Created
```json
{
  "_id": "...",
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "telephone": "+33612345678",
  "service": "Massage relaxant",
  "typeService": "Massage relaxant",
  "date": "2024-01-15",
  "heure": "14:00",
  "statut": "en_attente",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### 2. Récupérer les réservations par email (Public)
**GET** `/api/reservations/email/:email`

**Paramètres:**
- `email` (URL): L'adresse email de l'utilisateur (encodé en URL)

**Exemple:** `/api/reservations/email/jean%40example.com`

**Réponse:** 200 OK
```json
[
  {
    "_id": "...",
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean@example.com",
    "telephone": "+33612345678",
    "service": "Massage relaxant",
    "typeService": "Massage relaxant",
    "date": "2024-01-15",
    "heure": "14:00",
    "statut": "confirme",
    "message": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

**Erreurs:**
- `400`: Email requis ou format invalide
- `404`: Aucune réservation trouvée pour cet email
- `429`: Trop de requêtes (rate limit: 20 requêtes / 5 minutes)

**Note:** Cette route est protégée par un rate limiter pour éviter les abus.

---

### 3. Lister toutes les réservations (Admin uniquement)
**GET** `/api/reservations`

**Headers:**
```
Authorization: Bearer <token>
```

**Réponse:** 200 OK
```json
[
  {
    "_id": "...",
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean@example.com",
    "telephone": "+33612345678",
    "service": "Massage relaxant",
    "typeService": "Massage relaxant",
    "date": "2024-01-15",
    "heure": "14:00",
    "statut": "confirme",
    "message": "...",
    "createdAt": "...",
    "updatedAt": "..."
  }
]
```

---

### 4. Mettre à jour le statut d'une réservation (Admin uniquement)
**PUT** `/api/reservations/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "statut": "confirme"  // ou "annule", "en_attente"
}
```

**Réponse:** 200 OK
```json
{
  "_id": "...",
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean@example.com",
  "telephone": "+33612345678",
  "service": "Massage relaxant",
  "typeService": "Massage relaxant",
  "date": "2024-01-15",
  "heure": "14:00",
  "statut": "confirme",
  "message": "...",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## Statuts

Les statuts acceptés sont :
- `en_attente` : Réservation en attente de confirmation
- `confirme` / `confirmé` : Réservation confirmée (les deux formats sont acceptés)
- `annule` / `annulé` : Réservation annulée (les deux formats sont acceptés)

**Note:** Le backend stocke les statuts avec accents (`confirmé`, `annulé`), mais les réponses API utilisent le format sans accents (`confirme`, `annule`) pour compatibilité avec le frontend.

---

## Sécurité

### Rate Limiting
- Route publique `/email/:email` : 20 requêtes / 5 minutes
- Route création `/` : Pas de limite spécifique (gérée par le serveur)

### Authentification
- Routes admin (`GET /`, `PUT /:id`) : Requièrent un token JWT valide
- Routes publiques (`POST /`, `GET /email/:email`) : Accessibles sans authentification

---

## Format des données

### Champ `typeService`
Le champ `typeService` est ajouté automatiquement dans toutes les réponses pour compatibilité avec le frontend. Il contient la même valeur que le champ `service`.

### Normalisation de l'email
Les emails sont automatiquement :
- Convertis en minuscules
- Trimés (espaces supprimés)
- Validés avec une regex basique

---

## Gestion des erreurs

Toutes les erreurs suivent le format standard :
```json
{
  "message": "Message d'erreur descriptif"
}
```

Codes d'erreur courants :
- `400`: Requête invalide (validation échouée, format incorrect)
- `401`: Non autorisé (token manquant ou invalide)
- `403`: Accès interdit (pas les permissions)
- `404`: Ressource non trouvée
- `429`: Trop de requêtes (rate limit dépassé)
- `500`: Erreur serveur

