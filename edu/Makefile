all:
	mkdir -p pizza
	rsync\
	  -av\
	  --delete\
	  --exclude .git\
	  --exclude .gitignore\
	  --exclude .gitkeep\
	  --exclude .gitlab-ci.yml\
	  --exclude .idea\
	  pizza.git/ pizza

clean:
	rm -fr pizza
