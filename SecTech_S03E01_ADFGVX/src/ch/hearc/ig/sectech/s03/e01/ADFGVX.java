package ch.hearc.ig.sectech.s03.e01;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TreeMap;
import org.apache.commons.collections4.bidimap.TreeBidiMap;
import org.apache.commons.collections4.map.LinkedMap;

/**
 *
 * @author Fabien Maître
 */
public class ADFGVX {
  //Lettres pour les entêtes de lignes et colonnes de tableCodage
  private static final char[] LETTRES = {'A', 'D', 'F', 'G', 'V', 'X'};
  private List<Character> caracteres;     //Liste des 36 caractères à dispo
  private List<Character> caracteresUtil; //Caractère utilisés dans le désordre
  private String message; //Message à coder
  private Map<Character, LinkedList<Character>> messageSubst;  //Message substitué
  private Map<Character, LinkedList<Character>> messageTransp; //Message transposé
  private String key; //Clé de cryptage
  Map<Character, TreeBidiMap<Character, Character>> tableCodage; //Tableau ADFGVX

  public ADFGVX(){
    tableCodage = new LinkedHashMap<>();
    caracteres = new ArrayList<>();
    //Création de la liste des caractères utilisables
    for(char c = 'A'; c <= 'Z'; c++){
      caracteres.add(c);
    }
    for(char c = '0'; c <= '9'; c++){
      caracteres.add(c);
    }
    
    //Caractère à utiliser
    caracteresUtil = new ArrayList<>(caracteres);
    
    //Réorganise les caractères aléatoirement
    Collections.shuffle(caracteresUtil);
    
    messageSubst = new LinkedMap<>();
    messageTransp = new TreeMap<>();
    
    //Largeur du tableCodage
    //int largeur = LETTRES.length;
    //Hauteur du tableCodage
    //int hauteur = LETTRES.length;
    
    //Création du tableCodage
    //this.tableCodage = new char[largeur][hauteur];
    
    //Remplissage de tableCodage avec les caractères utilisables et les lettres d'entêtes
    for(Character lettreX : LETTRES){
      TreeBidiMap<Character, Character> y = new TreeBidiMap<>();
      for(Character lettreY : LETTRES){
        //Place le prochaine caractère dans tableCodage et le supprime de la lsite des caractères à utiliser
        y.put(lettreY, caracteresUtil.remove(0));
        tableCodage.put(lettreX, y);
      }
    }
  }
  
  public Map<Character, TreeBidiMap<Character, Character>> getTableCodage(){
    return tableCodage;
  }
  

  public String getKey(){
    return key;
  }

  public void setKey(String key){
    this.key = formatKey(key);
  }

  public List<Character> getCaracteres(){
    return caracteres;
  }

  public void setCaracteres(List<Character> caracteres){
    this.caracteres = caracteres;
  }

  public List<Character> getCaracteresUtil(){
    return caracteresUtil;
  }

  public void setCaracteresUtil(List<Character> caracteresUtil){
    this.caracteresUtil = caracteresUtil;
  }
  
  public String getMessage(){
    return message;
  }

  public void setMessage(String message){
    this.message = formatMessage(message);
  }

  public Map<Character, LinkedList<Character>> getMessageSubst(){
    return messageSubst;
  }

  public void setMessageSubst(Map<Character, LinkedList<Character>> messageSubst){
    this.messageSubst = messageSubst;
  }

  public Map<Character, LinkedList<Character>> getMessageTransp(){
    return messageTransp;
  }

  public void setMessageTransp(Map<Character, LinkedList<Character>> messageTransp){
    this.messageTransp = messageTransp;
  }
  
  //Encode le message par substitution
  public void encodeMessageSubstitution(){
    if(getMessage() == null){
      throw new IllegalStateException("Le message n'est pas défini");
    }
    
    int casesSuppl = 0;
    //S'il faut ajouter des caractères au tableau, on les ajoute à la longeur
    if(getMessage().length() % getKey().length() != 0){
      casesSuppl = (getMessage().length()*2) % (getKey().length()+1);
    }
    
    LinkedList<Character> substituts = new LinkedList<>();
    
    //Pour chaque lettre du message
    for(Character c : getMessage().toCharArray()){
      //Parcours toutes les lignes
      for(Map.Entry<Character, TreeBidiMap<Character, Character>> ligne : getTableCodage().entrySet()){
        //Cherche dans la colonne
        if(ligne.getValue().containsValue(c)){
          //Code ligne
          substituts.addLast(ligne.getKey());
          //Code colonne
          substituts.addLast(ligne.getValue().getKey(c));
        }
      }
    }
    
    //Pour compléter la table, sélectionne des caractères aléatoires
    Random rand = new Random();
    for(int i=0; i < casesSuppl; i++){
      substituts.addLast(LETTRES[rand.nextInt(LETTRES.length)]);
    }
    
    //Initialise le tableau du message substituté avec les colonnes de la clé
    for(char c : getKey().toCharArray()){
      getMessageSubst().put(c, new LinkedList<Character>());
    }
    
    //Rempli le tableau
    do{
      //A chaque colonne
      for(LinkedList<Character> cellule : getMessageSubst().values()){
        cellule.add(substituts.removeFirst());
      }
    }while(!substituts.isEmpty());
  }
  
  public void encodeMessageTransposition(){
    getMessageTransp().putAll(getMessageSubst());
  }
  
  //Met en forme le message
  private String formatMessage(String message){
    //Met tout en majuscule et supprime les espaces
    message = message.replace(" ", "");
    message = message.trim().toUpperCase();
    
    //Si message plus petit que la clé
    if(message.length() < getKey().length()){
      throw new IllegalArgumentException("Le message ne peut pas être plus petit que la clé");
    }
    
    //Contrôle que les caractères utilisés soient bien ceux autorisés
    for(char c : message.toCharArray()){
      if(!caracteres.contains(c)){
        throw new IllegalArgumentException("Le message utilise des caractères non-autorisés");
      }
    }
    return message;
  }
  
  //Met en forme la clé
  private String formatKey(String key){
    //Met tout en majuscule et supprime les espaces
    key = key.replace(" ", "");
    key = key.trim().toUpperCase();
    
    int keyLength = key.length();
            
    //Test si la longeur de la clé est bonne
    if(keyLength < 2){
      throw new IllegalArgumentException("La clé doit avoir au moins 2 caractères");
    }
    
    //Test si chacun caractère de la clé n'est utilisé qu'une seule fois    
    Set<Character> test  = new HashSet<>();
    for (int i=0; i < keyLength; i++) {
      if(!test.add(key.charAt(i))){
        throw new IllegalArgumentException("La clé ne doit pas contenir plusieurs fois le même caractère");
      }
    }
        
    //Contrôle que les caractères utilisés soient bien ceux autorisés
    for(char c : key.toCharArray()){
      if(!caracteres.contains(c)){
        throw new IllegalArgumentException("La clé utilise des caractères non-autorisés");
      }
    }
    return key;
  }
  
 
  //Retourne le message encodé par substitution
  public String printMessageSubst(){
    StringBuilder sb = new StringBuilder();
    
    //Hauteur des colonnes de substitution
    int colSize = getMessageSubst().entrySet().iterator().next().getValue().size();
    int compteur = 0;
    
    //Parcourt toutes les lignes
    do{
      //Pour chaque case du tableau de substitution
      for(char c : getMessageSubst().keySet()){
        //Récupère la case à la ligne et colonne courante
        sb.append(getMessageSubst().get(c).get(compteur));
      }
      //Passe à la ligne suivante
      compteur++;
      
    }while(compteur < colSize);

    return sb.toString();
  }
  
  
  //Retourne le message encodé par transposition
  public String printMessageTransp(){
    StringBuilder sb = new StringBuilder();

    //Hauteur des colonnes de substitution
    int colSize = getMessageTransp().entrySet().iterator().next().getValue().size();
    int compteur = 0;
    
    
    //Parcourt toutes les lignes
    do{
      //Pour chaque case du tableau de substitution
      for(char c : getMessageTransp().keySet()){
        //Récupère la case à la ligne et colonne courante
        sb.append(getMessageTransp().get(c).get(compteur));
      }
      //Passe à la ligne suivante
      compteur++;
      
    }while(compteur < colSize);

    return sb.toString();
  }
  
  
  @Override
  public String toString(){
    StringBuilder sb = new StringBuilder(" ");
    
    //Ligne d'entête
    for(Character header : getTableCodage().keySet()){
      sb.append(" ").append(header);
    }
    sb.append("\n");

    //Ligne
    for(Map.Entry<Character, TreeBidiMap<Character, Character>> ligne : getTableCodage().entrySet()){
      sb.append(ligne.getKey()).append(" ");
      for(Character cell : ligne.getValue().values()){
        sb.append(cell).append(" ");
      }
      sb.append("\n");
    }
    
    return sb.toString();
  }
}
