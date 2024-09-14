# Utiliser l'image officielle MongoDB comme base
FROM mongo:latest

# Exposer le port MongoDB
EXPOSE 27017

# Commande qui démarre MongoDB
CMD ["mongod"]
