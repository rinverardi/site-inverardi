all:
	mkdir -p bsc-inf-mci bsc-inf-webg

	if [ -d pizza.git ];\
        then\
          rsync\
            -av\
            --delete\
            --exclude .git\
            --exclude .gitignore\
            --exclude .gitkeep\
            --exclude .gitlab-ci.yml\
            --exclude .idea\
            pizza.git/ bsc-inf-webg;\
        fi

	rsync\
	  -av\
	  --delete\
	  ../../edu/bsc-inf-mci/assignments/prototyp/ bsc-inf-mci

clean:
	rm -fr bsc-inf-mci bsc-inf-webg
