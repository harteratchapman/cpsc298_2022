// the starting point for this file was here
// https://siongui.github.io/2017/02/09/c-generate-random-string/

#include <time.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* alphabet: [a-z0-9] */
const char alphabet[] = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$^&*()+";

/**
 * not a cryptographically secure number
 * return interger [0, n).
 */
int intN(int n) { return rand() % n; }

/**
 * Input: length of the random string [a-z0-9] to be generated
 */
char *randomString(int len) {
  char *rstr = malloc((len + 1) * sizeof(char));
  int i;
  for (i = 0; i < len; i++) {
    rstr[i] = alphabet[intN(strlen(alphabet))];
  }
  rstr[len] = '\0';
  return rstr;
}

int main(int argc, char **argv) {

  // use a seed from the first argument
  if (argc!=2) {
      printf("Usage: randstr seed_number\n");
      return -1;
  }
  int seed = atoi(argv[1]);
  printf("Seed value: %d\n",seed);
  srand(seed);

  char *p;
  p = randomString(10);
  printf("%s\n", p);
  free(p);

  p = randomString(11);
  printf("%s\n", p);
  free(p);

  p = randomString(12);
  printf("%s\n", p);
  free(p);
}