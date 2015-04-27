
alphabet= 'abcdefghijklmnopqrstuvwxyz0123456789'
alphabet2= 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
ordre='ADFGVX'

function standard(entree)
{
  entree.value=entree.value.toLowerCase();
  longueur = entree.value.length;
  entree_standard='';
  for (i=0; i<longueur; i++)
  {
    if (alphabet.indexOf(entree.value.charAt(i))!=-1)
    {
      entree_standard += entree.value.charAt(i)
    }
  }
  entree.value = entree_standard;
}

function CreerGrille (clef)
{
	standard(clef);
	var grille  = '';
	for(var nbr = 0; nbr < clef.value.length; nbr++){
		ch= clef.value.charAt(nbr)
		if (grille.indexOf (ch) < 0) {
			grille += ch
		}
	}
	for(var nbr = 0; nbr < alphabet.length; nbr++){
		ch= alphabet.charAt(nbr)
		if (grille.indexOf (ch) < 0) {
			grille += ch
		}
	}
	return grille
}

function standard3(entree)
{
  entree.value=entree.value.toUpperCase();
  longueur = entree.value.length;
  entree_standard='';
  for (i=0; i<longueur; i++)
  {
    if (alphabet2.indexOf(entree.value.charAt(i))!=-1)
    {
      entree_standard += entree.value.charAt(i)
    }
  }
  entree.value = entree_standard;
}


function CreerPermut (motclef)
{
    var tab = new Array()
	standard3(motclef)
	var perm  = '';
	var nbiter = motclef.value.length;
	for(m = 0; m < nbiter; m++) {
	   rang = 1000;
	   for(n = 0; n < nbiter; n++) {
		ch = motclef.value.charAt(n)
		if (alphabet2.indexOf(ch) < rang) {
		   j = n+1;
		   ok = true;
		   for(r = 0; r < m; r++) {ok = ok && (j != tab[r])};
		   if (ok) {
		   	 rang = alphabet2.indexOf(ch); 
			 k = j		 
		   }
		}
	   }
	   tab[m]=k
	}
	for(m = 0; m < nbiter; m++) {
	   perm += tab[m]
	   if (m < nbiter-1) {perm+=","}
	}
	return perm
}

function melanger(plaintext,permut) {
  ciphertext = "";
  perm = permut.value.split(",");
  dummy = (perm.length - (plaintext.length % perm.length)) % perm.length;
  for (i = 1; i <= dummy; i++) {
        plaintext = plaintext + "X"
    }
    for (i = 0; i < plaintext.length; i++) {
        j = perm[i % perm.length] - 1 + perm.length * Math.floor(i/perm.length);
        ciphertext = ciphertext + plaintext.charAt(j);
    }
  cypher = "";
  for (i = 0; i < perm.length; i++) {
      for (j=0; j<ciphertext.length/perm.length; j++){
         cypher = cypher + ciphertext.charAt(i+perm.length*j)
      }
   }
   return cypher
}

function ADFGVX(clair, clef, motclef, permut, chiffre, m11, m12, m13, m14, m15, m16, m21, m22, m23, m24, m25, m26, m31, m32, m33, m34, m35, m36, m41, m42, m43, m44, m45, m46, m51, m52, m53, m54, m55, m56, m61, m62, m63, m64, m65, m66)
{
	if (motclef.value!="") {permut.value=CreerPermut(motclef)}
	if (permut.value=="") {permut.value="1"}
	grille=CreerGrille(clef)
	chiffre.value = ""
	standard(clair)
	chiffre1 = ""
	for(nbr = 0; nbr < clair.value.length; nbr=nbr+1){
		ch   = clair.value.charAt(nbr);
		ord  = grille.indexOf(ch);
		ligne = Math.floor(ord / 6);
		col  = ord % 6;
		chiffre1 += ordre.charAt(ligne)
		chiffre1 += ordre.charAt(col)
	}
	chiffre2 = melanger(chiffre1,permut);
	for(nbr = 0; nbr < chiffre2.length; nbr=nbr+1){
		if ((nbr%5==0) && (nbr>0)) {chiffre.value += " "}
		chiffre.value += chiffre2.charAt(nbr)
	}
	m11.value = grille.charAt(0);
	m12.value = grille.charAt(1);
	m13.value = grille.charAt(2);
	m14.value = grille.charAt(3);
	m15.value = grille.charAt(4);
	m16.value = grille.charAt(5);
	m21.value = grille.charAt(6);
	m22.value = grille.charAt(7);
	m23.value = grille.charAt(8);
	m24.value = grille.charAt(9);
	m25.value = grille.charAt(10);
	m26.value = grille.charAt(11);
	m31.value = grille.charAt(12);
	m32.value = grille.charAt(13);
	m33.value = grille.charAt(14);
	m34.value = grille.charAt(15);
	m35.value = grille.charAt(16);
	m36.value = grille.charAt(17);
	m41.value = grille.charAt(18);
	m42.value = grille.charAt(19);
	m43.value = grille.charAt(20);
	m44.value = grille.charAt(21);
	m45.value = grille.charAt(22);
	m46.value = grille.charAt(23);
	m51.value = grille.charAt(24);
	m52.value = grille.charAt(25);
	m53.value = grille.charAt(26);
	m54.value = grille.charAt(27);
	m55.value = grille.charAt(28);
	m56.value = grille.charAt(29);
	m61.value = grille.charAt(30);
	m62.value = grille.charAt(31);
	m63.value = grille.charAt(32);
	m64.value = grille.charAt(33);
	m65.value = grille.charAt(34);
	m66.value = grille.charAt(35);
}

function standard2(entree)
{
  entree.value=entree.value.toUpperCase();
  longueur = entree.value.length;
  entree_standard='';
  for (i=0; i<longueur; i++)
  {
    if (ordre.indexOf(entree.value.charAt(i))!=-1)
    {
      entree_standard += entree.value.charAt(i)
    }
  }
  entree.value = entree_standard;
}

function invMelanger(ciphertext,permut) {
  perm = permut.value.split(",");
  cypher = ""
  invperm = new Array();
  for (i = 0; i < ciphertext.length/perm.length; i++) {
     for (j=0; j<perm.length; j++){
         cypher = cypher + ciphertext.charAt(i+j*ciphertext.length/perm.length)
      }
    }
  plaintext = "";
  for (i = 0; i < perm.length; i++) {
        invperm[perm[i]-1] = i + 1;
    }
   for (i = 0; i < cypher.length; i++) {
        j = invperm[i % invperm.length] - 1 + invperm.length * Math.floor(i/invperm.length);
        plaintext = plaintext + cypher.charAt(j);
   }
   return plaintext
}

function InvADFGVX(clair, clef, motclef, permut, chiffre, m11, m12, m13, m14, m15, m16, m21, m22, m23, m24, m25, m26, m31, m32, m33, m34, m35, m36, m41, m42, m43, m44, m45, m46, m51, m52, m53, m54, m55, m56, m61, m62, m63, m64, m65, m66)
{
	if (motclef.value!="") {permut.value=CreerPermut(motclef)}
	if (permut.value=="") {permut.value="1"}
	grille=CreerGrille(clef)
	standard2(chiffre)
	chiffre2=invMelanger(chiffre.value,permut)

	clair.value = ""; 
	for(nbr = 0; nbr < chiffre2.length; nbr=nbr+2){
	  ligne = ordre.indexOf(chiffre2.charAt(nbr));
	  col  = ordre.indexOf(chiffre2.charAt(nbr+1));
	  ch   = grille.charAt(6*ligne+col)
	  clair.value += ch
	}
	m11.value = grille.charAt(0);
	m12.value = grille.charAt(1);
	m13.value = grille.charAt(2);
	m14.value = grille.charAt(3);
	m15.value = grille.charAt(4);
	m16.value = grille.charAt(5);
	m21.value = grille.charAt(6);
	m22.value = grille.charAt(7);
	m23.value = grille.charAt(8);
	m24.value = grille.charAt(9);
	m25.value = grille.charAt(10);
	m26.value = grille.charAt(11);
	m31.value = grille.charAt(12);
	m32.value = grille.charAt(13);
	m33.value = grille.charAt(14);
	m34.value = grille.charAt(15);
	m35.value = grille.charAt(16);
	m36.value = grille.charAt(17);
	m41.value = grille.charAt(18);
	m42.value = grille.charAt(19);
	m43.value = grille.charAt(20);
	m44.value = grille.charAt(21);
	m45.value = grille.charAt(22);
	m46.value = grille.charAt(23);
	m51.value = grille.charAt(24);
	m52.value = grille.charAt(25);
	m53.value = grille.charAt(26);
	m54.value = grille.charAt(27);
	m55.value = grille.charAt(28);
	m56.value = grille.charAt(29);
	m61.value = grille.charAt(30);
	m62.value = grille.charAt(31);
	m63.value = grille.charAt(32);
	m64.value = grille.charAt(33);
	m65.value = grille.charAt(34);
	m66.value = grille.charAt(35);
}

function effacer(clair, chiffre, m11, m12, m13, m14, m15, m16, m21, m22, m23, m24, m25, m26, m31, m32, m33, m34, m35, m36, m41, m42, m43, m44, m45, m46, m51, m52, m53, m54, m55, m56, m61, m62, m63, m64, m65, m66)
{
	clair.value  = "";
	chiffre.value = "";
        m11.value = "";
	m12.value = "";
	m13.value = "";
	m14.value = "";
	m15.value = "";
	m16.value = "";
	m21.value = "";
	m22.value = "";
	m23.value = "";
	m24.value = "";
	m25.value = "";
	m26.value = "";
	m31.value = "";
	m32.value = "";
	m33.value = "";
	m34.value = "";
	m35.value = "";
	m36.value = "";
	m41.value = "";
	m42.value = "";
	m43.value = "";
	m44.value = "";
	m45.value = "";
	m46.value = "";
	m51.value = "";
	m52.value = "";
	m53.value = "";
	m54.value = "";
	m55.value = "";
	m56.value = "";
	m61.value = "";
	m62.value = "";
	m63.value = "";
	m64.value = "";
	m65.value = "";
	m66.value = "";
}

